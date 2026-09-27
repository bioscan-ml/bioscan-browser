import { REPORT_TYPES } from '../hooks/github/constants'
import { ReportFormData } from '../hooks/github/types'
import { Doc } from '../types/response-data'
import { APP_URL } from './constants'
import { getImageSrc } from './getImageSrc'
import { getTaxon } from './getTaxon'

export const generateIssueTitle = (data: {
  formData: ReportFormData
  doc: Doc
}) => `[${data.doc.id}]: ${data.formData.type}`

export const generateIssueBody = (data: {
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
- [Record details (BOLD)](https://portal.boldsystems.org/record/${data.doc.id})
- [Samples with same taxonomic label (${taxon.rankLabel}: ${taxon.label})](${APP_URL}/taxonomy-tree?taxon=${taxon.rankKey}-${taxon.label})
- [Samples with same DNA barcode (${data.doc.dna_bin})](${APP_URL}/search?dna_bin=${data.doc.dna_bin})

## Report details

### Report type

${data.formData.type}

### Comments

${data.formData.comments.length ? data.formData.comments : 'No comments'}

### Submitted by

${getUser(data)} from BIOSCAN Browser

`
}

export const generateIssueLabels = (data: { formData: ReportFormData }) => {
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
