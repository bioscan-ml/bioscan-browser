export type ViewMode = 'chart' | 'gallery' | 'table'

export type SortOrder = 'asc' | 'desc'

export type SearchType = 'image' | 'dna'

export interface Sort {
  key: string
  order: SortOrder
}

export interface Filter {
  type: string
  value: string[]
}
