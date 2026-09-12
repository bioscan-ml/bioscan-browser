import type { Config } from '@netlify/functions'
import { OWNER, REPO } from '../../src/hooks/github/constants'
import type {
  IssueSummary,
  ListIssuesResponse,
} from '../../src/hooks/github/types'
import {
  getInstallationOctokit,
  ID_PATTERN,
  isConfigured,
  json,
  logUpstreamError,
  notConfigured,
  UPSTREAM_TIMEOUT,
} from '../lib/github'

const FUNCTION_NAME = 'github-issues'

// Read-only lookup shown in every record dialog; the cap matches GitHub's
// thirty-per-minute search quota per installation so one visitor cannot
// exhaust it alone.
export const config: Config = {
  rateLimit: {
    windowLimit: 30,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}

export default async (req: Request) => {
  if (req.method !== 'GET') {
    return json(405, { error: 'Method not allowed' }, { Allow: 'GET' })
  }

  const id = new URL(req.url).searchParams.get('id')

  if (!id || !ID_PATTERN.test(id)) {
    return json(400, { error: 'Missing or invalid id' })
  }

  if (!isConfigured()) {
    return notConfigured(FUNCTION_NAME)
  }

  try {
    const octokit = await getInstallationOctokit()
    const { data } = await octokit.request('GET /search/issues', {
      q: `repo:${OWNER}/${REPO} is:issue in:title ${id}`,
      per_page: 20,
      advanced_search: 'true',
      request: { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT) },
    })
    const issues: IssueSummary[] = data.items.map(
      ({ id, title, html_url, state, state_reason }) => ({
        id,
        title,
        html_url,
        state,
        state_reason,
      }),
    )
    const body: ListIssuesResponse = { issues }

    return json(200, body, {
      'Netlify-CDN-Cache-Control':
        'public, max-age=60, stale-while-revalidate=300',
    })
  } catch (error) {
    logUpstreamError(`${FUNCTION_NAME}: search`, error)

    return json(502, { error: 'Could not load issues' })
  }
}
