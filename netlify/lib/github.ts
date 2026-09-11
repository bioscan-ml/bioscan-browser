import { App } from 'octokit'
import { APP_ID, INSTALLATION_ID } from '../../src/hooks/github/constants'
import type {
  CreateIssueResponse,
  ErrorResponse,
  ListIssuesResponse,
} from '../../src/hooks/github/types'

export const ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/
export const UPSTREAM_TIMEOUT = 5000

const PRIVATE_KEY_ENV = 'GITHUB_APP_PRIVATE_KEY'

let app: App | undefined

/** True when the private key is present. Checked before any upstream call. */
export const isConfigured = () => Boolean(process.env[PRIVATE_KEY_ENV])

/** Module-scoped singleton so Octokit reuses its installation token cache. */
export const getInstallationOctokit = async () => {
  if (!app) {
    app = new App({
      appId: APP_ID,
      privateKey: process.env[PRIVATE_KEY_ENV] ?? '',
    })
  }

  return app.getInstallationOctokit(INSTALLATION_ID)
}

export const json = (
  status: number,
  body: ListIssuesResponse | CreateIssueResponse | ErrorResponse,
  headers: Record<string, string> = {},
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })

export const notConfigured = (functionName: string) => {
  console.error(`${functionName}: ${PRIVATE_KEY_ENV} is not set`)

  return json(500, { error: 'Server is not configured' })
}

export const logUpstreamError = (step: string, error: unknown) => {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? (error as { status: unknown }).status
      : undefined
  const message = error instanceof Error ? error.message : String(error)

  console.error(`${step} failed`, status ?? '', message)
}
