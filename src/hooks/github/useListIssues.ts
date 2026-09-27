import { useQuery } from '@tanstack/react-query'
import { ListIssuesResponse } from './types'

const ENDPOINT = '/.netlify/functions/github-issues'
export const ISSUES_QUERY_KEY = 'issues'

export const useListIssues = (id: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: [ISSUES_QUERY_KEY, id],
    queryFn: async (): Promise<ListIssuesResponse> => {
      const res = await fetch(`${ENDPOINT}?id=${encodeURIComponent(id)}`)

      if (!res.ok) {
        throw new Error(`Loading issues failed with status ${res.status}`)
      }

      return res.json()
    },
    // Matches the one-minute CDN cache window on the function.
    staleTime: 60 * 1000,
  })

  return { issues: data?.issues, isPending, error }
}
