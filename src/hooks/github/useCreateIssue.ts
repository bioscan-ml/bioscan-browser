import { getImageSrc } from '@/lib/getImageSrc'
import { Doc } from '@/types/response-data'
import { useMutation } from '@tanstack/react-query'
import { App } from 'octokit'
import { APP_ID, INSTALLATION_ID, OWNER, REPO, REPORT_TYPES } from './constants'
import { ReportFormData } from './types'
import { getTaxon } from '@/lib/getTaxon'
import { APP_URL } from '@/lib/constants'

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

const generateIssueTitle = (data: { formData: ReportFormData; doc: Doc }) =>
  `[${data.doc.id}]: ${data.formData.type}`

const generateIssueBody = (data: {
  formData: ReportFormData
  doc: Doc
  boldDoc?: unknown
}) => {
  const { taxon } = getTaxon(data.doc)

  return `## Record details

### Process ID

[${data.doc.id}](${APP_URL}/record/${data.doc.id})

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

<details>

<summary>BOLD</summary>

\`\`\`
${data.boldDoc ? JSON.stringify(data.boldDoc, null, 4) : 'Not found'}
\`\`\`

</details>

### Links
- [Record details (BIOSCAN Browser)](${APP_URL}/record/${data.doc.id})
- [Record details (BOLD Systems)](https://portal.boldsystems.org/record/${data.doc.id})
- [Samples with same taxonomic label](${APP_URL}/taxonomy-tree?taxon=${taxon.rankKey}-${taxon.label})
- [Samples with same DNA barcode](${APP_URL}/search?dna_bin=${data.doc.dna_bin})

## Report details

### Report type

${data.formData.type}

### Comments

${data.formData.comments.length ? data.formData.comments : 'No comments'}

### Submitted by

${getUser(data)} from BIOSCAN Browser

`
}

const generateIssueLabels = (data: { formData: ReportFormData }) => {
  const reportType = REPORT_TYPES.find(
    ({ title }) => data.formData.type === title,
  )

  const label = reportType?.label

  return ['report', ...(label ? [label] : [])]
}

const getUser = (data: { formData: ReportFormData; doc: Doc }) => {
  if (data.formData.gitHubUser.length) {
    const gitHubUser = data.formData.gitHubUser.includes('@')
      ? data.formData.gitHubUser
      : `@${data.formData.gitHubUser}`

    if (data.formData.name.length) {
      return `${data.formData.name} (${gitHubUser})`
    } else {
      return gitHubUser
    }
  }

  if (data.formData.name.length) {
    return data.formData.name
  }

  return 'Anonymous user'
}
