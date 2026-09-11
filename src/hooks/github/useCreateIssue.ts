import { Doc } from '@/types/response-data'
import { useMutation } from '@tanstack/react-query'
import {
  CreateIssueRequest,
  CreateIssueResponse,
  ReportFormData,
} from './types'

const ENDPOINT = '/.netlify/functions/github-report'

export const useCreateIssue = () => {
  const { mutate, isPending, isSuccess, error, reset, data } = useMutation({
    mutationFn: async (data: {
      formData: ReportFormData
      doc: Doc
      boldDoc?: unknown
    }): Promise<CreateIssueResponse> => {
      // Only the form fields are sent. The function looks the record up
      // itself, so the ID the user typed is what gets reported.
      const body: CreateIssueRequest = {
        id: data.formData.id,
        type: data.formData.type,
        comments: data.formData.comments,
        name: data.formData.name,
        gitHubUser: data.formData.gitHubUser,
      }
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        throw new Error(`Report submission failed with status ${res.status}`)
      }

      return res.json()
    },
  })

  return { createIssue: mutate, isPending, isSuccess, error, reset, data }
}
