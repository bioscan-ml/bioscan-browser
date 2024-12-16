import { Doc } from '@/types/response-data'
import { Sort } from '@/types/settings'

export const FIELDS: {
  label: string
  key: keyof Doc
  cellClass?: string
  sortDisabled?: boolean
}[] = [
  { label: 'ID', key: 'id', cellClass: 'font-medium' },
  { label: 'Sample ID', key: 'sampleid' },
  { label: 'Country', key: 'country' },
  { label: 'Province/State', key: 'province_state' },
  { label: 'Collectors', key: 'collectors', sortDisabled: true },
  { label: 'Phylum', key: 'phylum' },
  { label: 'Class', key: 'class' },
  { label: 'Order', key: 'order' },
  { label: 'Family', key: 'family' },
  { label: 'Subfamily', key: 'subfamily' },
  { label: 'Genus', key: 'genus' },
  { label: 'Species', key: 'species' },
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

export const FILTER_TYPES = [
  { label: 'ID', key: 'id' },
  { label: 'Sample ID', key: 'sampleid' },
  { label: 'Country', key: 'country' },
  { label: 'Province/State', key: 'province_state' },
  ...TAXON_FILTER_TYPES,
  { label: 'DNA BIN', key: 'dna_bin' },
  { label: 'Split', key: 'split' },
  { label: 'Chunk', key: 'chunk' },
]

export const SOLR_BASE_PATH = '/api/scene-toolkit/solr/bioscan5m/select'

export const DEFAULT_PAGINATION = { page: 0, pageSize: 100 }

export const PAGE_SIZE_OPTIONS = [50, 100, 250, 500, 1000]

export const DEFAULT_SORT: Sort = {
  key: 'id',
  order: 'asc',
}

export const ROOT_NODE_ID = 'phylum-Arthropoda'

export const BIOSCAN_BROWSER_USER_AGENT = 'bioscan-browser/1.0.0'

export const RESOURCES = {
  DATASET_GITHUB: 'https://github.com/bioscan-ml/BIOSCAN-5M/',
  DATASET_WEBSITE: 'https://biodiversitygenomics.net/projects/5m-insects/',
  GITHUB: 'https://github.com/bioscan-ml/bioscan-browser',
  INATURALIST_API: 'https://api.inaturalist.org/v1/docs/',
  SYSTEM_STATUS: 'https://bioscan-browser.cronitorstatus.com/',
}
