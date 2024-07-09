import { TaxonomyTreeNode } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

export const useTaxonomy = () => {
  const { isPending, error, data } = useQuery<TaxonomyTreeNode>({
    queryKey: ['taxonomy'],
    queryFn: () =>
      fetch('api/stk-bioscan/bioscan/data/BIOSCAN_5M_taxonomy.json').then(
        (res) => res.json(),
      ),
  })

  return { isPending, error, taxonomy: data }
}
