import { TaxonomyTreeNode } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'taxonomy'

export const useTaxonomyTree = () => {
  const { isPending, error, data } = useQuery<TaxonomyTreeNode>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const res = await fetch('/taxonomy.json')

      return await res.json()
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  return { isPending, error, taxonomyTree: data }
}
