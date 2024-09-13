import { TaxonDetails } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

// See https://api.inaturalist.org/v1/docs/ for more info
const API_URL = 'https://api.inaturalist.org/v1'

const RANK_LEVELS: { [key: string]: number } = {
  phylum: 60,
  class: 50,
  order: 40,
  family: 30,
  subfamily: 27,
  genus: 20,
  species: 10,
}

const QUERY_KEY = 'taxon-details'

export const useTaxonDetails = (taxon: {
  label: string
  rankLevel: string
}) => {
  const q = taxon.label

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rankLevel = RANK_LEVELS[taxon.rankLevel]

  const { isPending, error, data } = useQuery<{
    results: TaxonDetails[]
  }>({
    queryKey: [QUERY_KEY, taxon],
    queryFn: async () => {
      // Search taxa by string
      const taxaRes = await fetch(`${API_URL}/taxa?q=${q}&taxon_id=47120`)
      const taxaData = await taxaRes.json()
      const taxonId = taxaData.results.find(
        (result: { matched_term: string }) => result.matched_term === q,
      )?.id

      // Throw error if no match
      if (!taxonId) {
        throw Error()
      }

      // Fetch taxon details by id
      const taxonRes = await fetch(`${API_URL}/taxa/${taxonId}`)
      const taxonData = await taxonRes.json()

      return taxonData
    },
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  return {
    isPending,
    error,
    taxonDetails: data?.results[0],
  }
}
