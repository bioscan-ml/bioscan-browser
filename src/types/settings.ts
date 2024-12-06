export type ViewMode = 'chart' | 'gallery' | 'table'

export type SortOrder = 'asc' | 'desc'

export type SearchType = 'Image' | 'DNA'

export interface Sort {
  key: string
  order: SortOrder
}

export interface Filter {
  type: string
  value: string[]
}
