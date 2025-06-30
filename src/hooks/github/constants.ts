const APP_ID = 1471676

const INSTALLATION_ID = 73295615

const OWNER = 'bioscan-ml'

const REPO = 'bioscan-5m'

const REPORT_TYPES = [
  { title: 'No insect in the image', label: 'image' },
  { title: 'Insect is not clearly visible', label: 'image' },
  { title: 'Image contains multiple insects', label: 'image' },
  { title: 'Insect is cropped incorrectly', label: 'image' },
  { title: 'Metadata is not correct', label: 'metadata' },
  { title: 'Contest current label', label: 'label' },
  {
    title: 'Suggest label for deeper taxonomic level',
    label: 'label',
  },
  { title: 'Other report' },
]

const COMMENT_INSTRUCTIONS: { [label: string]: string } = {
  image:
    'Please include other comments about the problematic image. You may alternatively leave this field blank.',
  metadata:
    'Please describe what metadata seems to be incorrect and why you think so. If you have suggestions on what would be correct, please include those details as well.',
  label:
    'Please be as detailed as possible about label change suggestions. What seems wrong? What would be correct? Why do you think this would be correct?',
}

export {
  APP_ID,
  INSTALLATION_ID,
  OWNER,
  REPO,
  REPORT_TYPES,
  COMMENT_INSTRUCTIONS,
}
