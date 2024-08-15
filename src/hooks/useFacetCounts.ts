import { SOLR_BASE_PATH } from '@/lib/constants'
import { FacetCounts } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'facet'
const FACET = {
  MIN_COUNT: 1,
  LIMIT: 25000,
  FIELDS: [
    'country',
    'province_state',
    'phylum',
    'class',
    'order',
    'family',
    'subfamily',
    'genus',
    'species',
    'split',
  ],
}

export const useFacetCounts = () => {
  const { isPending, error, data } = useQuery<{
    facet_counts?: FacetCounts
  }>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const res = await fetch(
        `${SOLR_BASE_PATH}?rows=0&q=*:*`,
        getFetchSettings(),
      )

      return await res.json()
    },
  })

  return {
    isPending,
    error,
    facetCounts: data ? data.facet_counts : undefined,
  }
}

const getFetchSettings = () => {
  const formValues = new URLSearchParams({})
  formValues.append('facet', `${true}`)
  formValues.append('facet.mincount', `${FACET.MIN_COUNT}`)
  formValues.append('facet.limit', `${FACET.LIMIT}`)
  FACET.FIELDS.forEach((field) => formValues.append('facet.field', field))

  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: formValues,
  }
}
