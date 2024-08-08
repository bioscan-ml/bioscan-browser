import { Doc } from '@/types/response-data'
import { Sort } from '@/types/settings'

export const FIELDS: { label: string; key: keyof Doc; cellClass?: string }[] = [
  { label: 'ID', key: 'id', cellClass: 'font-medium' },
  { label: 'Sample ID', key: 'sampleid' },
  { label: 'Country', key: 'country' },
  { label: 'Province/State', key: 'province_state' },
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
  { label: 'Process ID', key: 'processid' },
  { label: 'Sample ID', key: 'sampleid' },
  { label: 'DNA Barcode', key: 'dna_barcode' },
  { label: 'DNA BIN', key: 'dna_bin' },
  { label: 'Country', key: 'country' },
]

export const DEFAULT_PAGE = 0

export const PAGE_SIZE = 100

export const DEFAULT_SORT: Sort = {
  key: 'id',
  order: 'asc',
}

export const ROOT_NODE_ID = 'phylum-Arthropoda'
