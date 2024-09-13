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

export interface FacetCounts {
  facet_fields: { [key: string]: (string | number)[] }
}

export interface TaxonomyTreeNode {
  children: TaxonomyTreeNode[]
  li_attr: {
    id: string
    title: string
  }
  metadata: {
    label: string
    taxon: string
    numChildren: number
    numInstances: number
  }
  text: string
}

export interface TaxonDetails {
  id: number
  name: string
  rank: string
  preferred_common_name: string
  taxon_photos: {
    photo: {
      attribution: string
      id: number
      original_url: string
      large_url: string
      small_url: string
    }
    taxon: {
      id: number
      name: string
    }
  }[]
  wikipedia_summary?: string
  wikipedia_url?: string
}
