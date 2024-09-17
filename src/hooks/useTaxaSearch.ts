import { getNode } from '@/lib/taxonomy-tree/getNode'
import { Taxon } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTaxonomyTree } from './useTaxonomyTree'

// See https://api.inaturalist.org/v1/docs/ for more info
const API_URL = 'https://api.inaturalist.org/v1'

const QUERY_KEY = 'taxa-search'

const LIMIT = 5

export const useTaxaSearch = (q: string) => {
  const { taxonomyTree, isPending: isTaxonomyTreePending } = useTaxonomyTree()
  const enabled = q.length > 3

  const { isPending, error, data } = useQuery<{ results: Taxon[] }>({
    queryKey: [QUERY_KEY, q],
    queryFn: async () => {
      const taxaRes = await fetch(
        `${API_URL}/taxa/autocomplete?q=${q}&taxon_id=47120`,
      )
      const taxaData = await taxaRes.json()

      return taxaData
    },
    enabled,
  })

  const taxa = useMemo(() => {
    if (!taxonomyTree || !data?.results) {
      return undefined
    }

    return data.results
      .map((taxon) => {
        const treeNode = getNode(taxonomyTree, `${taxon.rank}-${taxon.name}`)
        const count = treeNode?.metadata.numInstances ?? 0

        return {
          ...taxon,
          count,
        }
      })
      .filter((taxon) => taxon.count !== 0)
      .slice(0, LIMIT)
  }, [taxonomyTree, data?.results])

  return {
    isPending: enabled && (isPending || isTaxonomyTreePending),
    error,
    data: taxa,
  }
}
