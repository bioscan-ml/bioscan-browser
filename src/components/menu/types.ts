export type Flags = {
  external?: boolean
  experimental?: boolean
}

export type MenuItem = {
  children?: { flags?: Flags; id: string; label: string; to: string }[]
  flags?: Flags
  id: string
  label: string
  to?: string
}
