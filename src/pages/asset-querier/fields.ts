import { Doc } from '@/types/response-data'

export const FIELDS: { label: string; key: keyof Doc; cellClass?: string }[] = [
  { label: 'ID', key: 'id', cellClass: 'font-medium' },
  { label: 'Sample ID', key: 'sampleid' },
  { label: 'Country', key: 'country' },
  { label: 'Phylum', key: 'phylum' },
  { label: 'Class', key: 'class' },
  { label: 'Order', key: 'order' },
  { label: 'Family', key: 'family' },
  { label: 'Subfamily', key: 'subfamily' },
  { label: 'Genus', key: 'genus' },
  { label: 'Species', key: 'species' },
]
