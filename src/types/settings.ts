export type ViewMode = 'chart' | 'gallery' | 'table'

export type SortOrder = 'asc' | 'desc'

export interface Sort {
  key: string
  order: SortOrder
}
