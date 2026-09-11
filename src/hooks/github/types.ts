export type ReportFormData = {
  comments: string
  gitHubUser: string
  id: string
  name: string
  type: string
}

/** POST body sent by the browser. The function fetches the record itself. */
export type CreateIssueRequest = ReportFormData

export type CreateIssueResponse = {
  html_url: string
}

/** The subset of a GitHub issue that the IssueList component renders. */
export type IssueSummary = {
  id: number
  title: string
  html_url: string
  state: string
  state_reason?: string | null
}

export type ListIssuesResponse = {
  issues: IssueSummary[]
}

export type ErrorResponse = {
  error: string
}
