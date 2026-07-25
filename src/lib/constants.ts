import { Doc } from '@/types/response-data'

export const PATHS = {
  ABOUT: '/about',
  CHATBOT: '/chatbot',
  FIND_SIMILAR: '/find-similar',
  HOME: '/',
  MY_BOOKMARKS: '/my-bookmarks',
  RECORD: '/record/:id',
  REPORT: '/report',
  SEARCH: '/search',
  STYLE_GUIDE: '/style-guide',
  TAXONOMY_TREE: '/taxonomy-tree',
}

export const FIELDS: {
  label: string
  key: keyof Doc
  sortDisabled?: boolean
  tooltip?: string
}[] = [
  { label: 'Process ID', key: 'id' },
  { label: 'Sample ID', key: 'sampleid' },
  { label: 'Phylum', key: 'phylum' },
  { label: 'Class', key: 'class' },
  { label: 'Order', key: 'order' },
  { label: 'Family', key: 'family' },
  { label: 'Subfamily', key: 'subfamily' },
  { label: 'Genus', key: 'genus' },
  { label: 'Species', key: 'species' },
  { label: 'Country', key: 'country' },
  { label: 'Province/State', key: 'province_state' },
  { label: 'Collectors', key: 'collectors', sortDisabled: true },
  {
    label: 'Organism area (mm²)',
    key: 'organism_area_mm2',
    tooltip: 'Area occupied by the organism in square millimeters',
  },
]

export const TAXON_FILTER_TYPES = [
  { label: 'Phylum', key: 'phylum' },
  { label: 'Class', key: 'class' },
  { label: 'Order', key: 'order' },
  { label: 'Family', key: 'family' },
  { label: 'Subfamily', key: 'subfamily' },
  { label: 'Genus', key: 'genus' },
  { label: 'Species', key: 'species' },
]

export const FILTER_TYPES: { label: string; key: string }[] = [
  { label: 'Country', key: 'country' },
  { label: 'Province/State', key: 'province_state' },
  ...TAXON_FILTER_TYPES,
  {
    label: 'Organism area (mm²)',
    key: 'organism_area_mm2',
  },
  {
    label: 'Scale source',
    key: 'scale_source',
  },
  { label: 'DNA BIN', key: 'dna_bin' },
  { label: 'Split', key: 'split' },
  { label: 'Chunk', key: 'chunk' },
]

export const APP_URL = 'https://browser.bioscan-ml.org'

export const SOLR_BASE_PATH = `${import.meta.env.VITE_API_URL}/solr/bioscan5m/select`

export const BACKEND_BASE_PATH = `${import.meta.env.VITE_API_URL}/bioscan-browser`

export const IMAGES_BASE_PATH =
  'https://annotations2.cs.sfu.ca/data/bioscan/bioscan5m/images'

export const DEFAULT_PAGINATION = { page: 0, pageSize: 100 }

export const PAGE_SIZE_OPTIONS = [50, 100, 250, 500, 1000]

export const ROOT_NODE_ID = 'phylum-Arthropoda'

export const BIOSCAN_BROWSER_USER_AGENT = 'bioscan-browser/1.0.0'

export const RESOURCES = {
  DATASET_GITHUB_ISSUES: 'https://github.com/bioscan-ml/BIOSCAN-5M/issues',
  DATASET_GITHUB_PROJECT: 'https://github.com/orgs/bioscan-ml/projects/2',
  DATASET_GITHUB: 'https://github.com/bioscan-ml/BIOSCAN-5M/',
  DATASET_WEBSITE: 'https://biodiversitygenomics.net/projects/5m-insects/',
  GITHUB: 'https://github.com/bioscan-ml/bioscan-browser',
  INATURALIST_API: 'https://api.inaturalist.org/v1/docs/',
  PROJECT_WEBSITE: 'https://biodiversitygenomics.net/research/bioscan/',
  SYSTEM_STATUS: 'https://bioscan-browser.cronitorstatus.com/',
}

export const REQUEST_TIMEOUT = 5000
