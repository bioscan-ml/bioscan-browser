import type { Config } from '@netlify/functions'
import { OWNER, REPO, REPORT_TYPES } from '../../src/hooks/github/constants'
import type {
  CreateIssueRequest,
  CreateIssueResponse,
} from '../../src/hooks/github/types'
import {
  generateIssueBody,
  generateIssueLabels,
  generateIssueTitle,
} from '../../src/lib/generateIssue'
import type { Doc } from '../../src/types/response-data'
import {
  getInstallationOctokit,
  ID_PATTERN,
  isConfigured,
  json,
  logUpstreamError,
  notConfigured,
  UPSTREAM_TIMEOUT,
} from '../lib/github'

const FUNCTION_NAME = 'github-report'

// Solr is reached directly, not through the site's /api proxy, because this
// runs server-side. Same host as the redirect target in netlify.toml.
const SOLR_SELECT_URL = 'https://annotations2.cs.sfu.ca/solr/bioscan5m/select'
const BOLD_API_URL = 'https://portal.boldsystems.org/api'
const BOLD_TIMEOUT = 2500
const MAX_BODY_BYTES = 32 * 1024
const GITHUB_USER_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/
const REPORT_TYPE_TITLES = new Set(REPORT_TYPES.map(({ title }) => title))

// Creates issues as the app; tight per-visitor cap. A person files one or two.
export const config: Config = {
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' }, { Allow: 'POST' })
  }

  const text = await req.text()

  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
    return json(413, { error: 'Request too large' })
  }

  let payload: unknown

  try {
    payload = JSON.parse(text)
  } catch {
    return json(400, { error: 'Body must be JSON' })
  }

  const formData = validateFormData(payload)

  if (!formData) {
    return json(400, { error: 'Invalid report' })
  }

  if (!isConfigured()) {
    return notConfigured(FUNCTION_NAME)
  }

  let doc: Doc | undefined
  let boldDoc: unknown

  try {
    const results = await Promise.all([
      fetchRecord(formData.id),
      fetchBoldRecord(formData.id),
    ])
    doc = results[0]
    boldDoc = results[1]
  } catch (error) {
    logUpstreamError(`${FUNCTION_NAME}: fetch record`, error)

    return json(502, { error: 'Could not load record' })
  }

  if (!doc) {
    return json(404, { error: 'Record not found' })
  }

  try {
    const octokit = await getInstallationOctokit()
    const { data } = await octokit.rest.issues.create({
      owner: OWNER,
      repo: REPO,
      title: generateIssueTitle({ formData, doc }),
      body: generateIssueBody({ formData, doc, boldDoc }),
      labels: generateIssueLabels({ formData }),
      request: { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT) },
    })
    const body: CreateIssueResponse = { html_url: data.html_url }

    return json(201, body)
  } catch (error) {
    logUpstreamError(`${FUNCTION_NAME}: create issue`, error)

    return json(502, { error: 'Could not submit the report' })
  }
}

const isString = (value: unknown): value is string => typeof value === 'string'

const validateFormData = (payload: unknown): CreateIssueRequest | null => {
  if (typeof payload !== 'object' || payload === null) {
    return null
  }

  const { id, type, comments, name, gitHubUser } = payload as Record<
    string,
    unknown
  >

  if (!isString(id) || !ID_PATTERN.test(id)) {
    return null
  }

  if (!isString(type) || !REPORT_TYPE_TITLES.has(type)) {
    return null
  }

  if (!isString(comments) || comments.length > 5000) {
    return null
  }

  if (!isString(name) || name.length > 100) {
    return null
  }

  if (!isString(gitHubUser) || gitHubUser.length > 40) {
    return null
  }

  const gitHubUserName = gitHubUser.replace(/^@/, '')

  if (gitHubUser.length && !GITHUB_USER_PATTERN.test(gitHubUserName)) {
    return null
  }

  return { id, type, comments, name, gitHubUser }
}

const fetchRecord = async (id: string): Promise<Doc | undefined> => {
  const q = encodeURIComponent(`id:"${id}"`)
  const res = await fetch(`${SOLR_SELECT_URL}?q=${q}&rows=1`, {
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT),
  })

  if (!res.ok) {
    throw new Error(`Solr responded with ${res.status}`)
  }

  const data = await res.json()

  return data.response?.docs?.[0]
}

/** Best effort, mirrors useBoldRecord. Resolves to undefined on any failure. */
const fetchBoldRecord = async (id: string): Promise<unknown> => {
  try {
    const queryRes = await fetch(
      `${BOLD_API_URL}/query?query=ids:processid:${encodeURIComponent(id)}&extent=full`,
      { signal: AbortSignal.timeout(BOLD_TIMEOUT) },
    )

    if (!queryRes.ok) {
      return undefined
    }

    const queryData = await queryRes.json()

    if (!queryData.query_id) {
      return undefined
    }

    const res = await fetch(`${BOLD_API_URL}/documents/${queryData.query_id}`, {
      signal: AbortSignal.timeout(BOLD_TIMEOUT),
    })

    if (!res.ok) {
      return undefined
    }

    const data = await res.json()

    return data.data?.[0]
  } catch {
    return undefined
  }
}
