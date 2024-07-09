export interface Doc {
  chunk?: string
  class: string
  country: string
  family: string
  genus: string
  id: string
  latlon: string
  order: string
  phylum: string
  province_state: string
  sampleid: string
  species: string
  split: string
  subfamily: string
}

export interface ResponseData {
  response: {
    docs: Doc[]
    numFound: number
    start: number
  }
}
