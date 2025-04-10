import { getImageSrc } from '@/lib/getImageSrc'
import { Doc } from '@/types/response-data'
import { useMutation } from '@tanstack/react-query'
import { App } from 'octokit'
import { APP_ID, INSTALLATION_ID, OWNER, REPO, REPORT_TYPES } from './constants'
import { ReportFormData } from './types'

const PRIVATE_KEY = import.meta.env.VITE_GITHUB_APP_PRIVATE_KEY

const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
})

export const useCreateIssue = () => {
  const { mutate, isPending, isSuccess, error, reset } = useMutation({
    mutationFn: async (data: { formData: ReportFormData; doc: Doc }) => {
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

  return { createIssue: mutate, isPending, isSuccess, error, reset }
}

const generateIssueTitle = (data: { formData: ReportFormData; doc: Doc }) =>
  `[${data.doc.id}]: ${data.formData.type}`

const generateIssueBody = (data: { formData: ReportFormData; doc: Doc }) => {
  return `## Record details

### Record ID

${data.doc.id}

### Images

| Original full | Cropped full |
| :---: | :---: |
| <img width="320" src="${getImageSrc(data.doc, 'original_full')}" /> | <img width="320" src="${getImageSrc(data.doc, 'cropped')}" /> |

### Metadata
<details>

<summary>BIOSCAN-5M</summary>

\`\`\`
${JSON.stringify(data.doc, null, 4)}
\`\`\`

</details>

## Report details

### Report type

${data.formData.type}

### Comments

${data.formData.comments.length ? data.formData.comments : 'No comments'}

### Submitted by

${data.formData.name.length ? data.formData.name : 'Anonymous user'} from BIOSCAN Browser

`
}

const generateIssueLabels = (data: { formData: ReportFormData }) => {
  const reportType = REPORT_TYPES.find(
    ({ title }) => data.formData.type === title,
  )

  const label = reportType?.label

  return ['report', ...(label ? [label] : [])]
}
