import { Doc } from '@/types/response-data'
import { useMutation } from '@tanstack/react-query'
import { App } from 'octokit'
import { APP_ID, INSTALLATION_ID, OWNER, REPO } from './constants'
import { ReportFormData } from './types'
import {
  generateIssueBody,
  generateIssueLabels,
  generateIssueTitle,
} from '@/lib/generateIssue'

const PRIVATE_KEY = import.meta.env.VITE_GITHUB_APP_PRIVATE_KEY

const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
})

export const useCreateIssue = () => {
  const { mutate, isPending, isSuccess, error, reset, data } = useMutation({
    mutationFn: async (data: {
      formData: ReportFormData
      doc: Doc
      boldDoc?: unknown
    }) => {
      const octokit = await app.getInstallationOctokit(INSTALLATION_ID)

      return await octokit.rest.issues.create({
        owner: OWNER,
        repo: REPO,
        title: generateIssueTitle(data),
        body: generateIssueBody(data),
        labels: generateIssueLabels(data),
      })
    },
  })

  return { createIssue: mutate, isPending, isSuccess, error, reset, data }
}
