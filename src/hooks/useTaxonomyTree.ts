import { TaxonomyTreeNode } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'taxonomy'
const BASE_PATH = 'api/stk-bioscan/bioscan/data'

export const useTaxonomyTree = () => {
  const { isPending, error, data } = useQuery<TaxonomyTreeNode>({
    queryKey: [QUERY_KEY],
    queryFn: () =>
      fetch(`${BASE_PATH}/BIOSCAN_5M_taxonomy.json`).then((res) => res.json()),
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  return { isPending, error, taxonomyTree: data }
}
