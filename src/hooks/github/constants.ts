const APP_ID = 1203652

const INSTALLATION_ID = 63888647

const OWNER = 'annavik'

const REPO = 'bioscan-experiments'

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

export { APP_ID, INSTALLATION_ID, OWNER, REPO, REPORT_TYPES }
