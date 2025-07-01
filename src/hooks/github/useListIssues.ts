import { useQuery } from '@tanstack/react-query'
import { App } from 'octokit'
import { APP_ID, INSTALLATION_ID, OWNER, REPO } from './constants'

const PRIVATE_KEY = import.meta.env.VITE_GITHUB_APP_PRIVATE_KEY
const QUERY_KEY = 'issues'

const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
})

export const useListIssues = (id: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const octokit = await app.getInstallationOctokit(INSTALLATION_ID)

      const query = `repo:${OWNER}/${REPO} is:issue state:open state:closed in:title ${id}`

      return await octokit.rest.search.issuesAndPullRequests({
        q: query,
      })
    },
  })

  return { issues: data?.data.items, isPending, error }
}
