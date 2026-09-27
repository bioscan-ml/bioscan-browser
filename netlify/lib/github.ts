import { App } from 'octokit'
import type {
  CreateIssueResponse,
  ErrorResponse,
  ListIssuesResponse,
} from '../../src/hooks/github/types'

export const ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/
export const UPSTREAM_TIMEOUT = 5000

const REQUIRED_ENV = [
  'GITHUB_APP_ID',
  'GITHUB_APP_INSTALLATION_ID',
  'GITHUB_APP_PRIVATE_KEY',
  'GITHUB_OWNER',
  'GITHUB_REPO',
]

export const OWNER = process.env.GITHUB_OWNER ?? ''
export const REPO = process.env.GITHUB_REPO ?? ''

let app: App | undefined

const missingEnv = () => REQUIRED_ENV.filter((name) => !process.env[name])

/** True when the GitHub settings are present. Checked before any upstream call. */
export const isConfigured = () => missingEnv().length === 0

/** Module-scoped singleton so Octokit reuses its installation token cache. */
export const getInstallationOctokit = async () => {
  if (!app) {
    app = new App({
      appId: process.env.GITHUB_APP_ID ?? '',
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY ?? '',
    })
  }

  return app.getInstallationOctokit(
    Number(process.env.GITHUB_APP_INSTALLATION_ID),
  )
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
  console.error(`${functionName}: ${missingEnv().join(', ')} not set`)

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
