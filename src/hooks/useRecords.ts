import { SOLR_BASE_PATH } from '@/lib/constants'
import { Doc, FacetCounts } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'records'

export const useRecords = (params: {
  page: number
  pageSize: number
  sort?: Sort
  q?: string
  facet?: boolean
}) => {
  const { isPending, error, data } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
    facet_counts?: FacetCounts
  }>({
    queryKey: [QUERY_KEY, params],
    queryFn: async () => {
      const res = await fetch(getFetchUrl(params))

      return await res.json()
    },
  })

  return {
    isPending,
    error,
    data: data
      ? {
          ...data.response,
          facetCounts: data.facet_counts,
        }
      : undefined,
  }
}

const getFetchUrl = (params: {
  page: number
  pageSize: number
  sort?: Sort
  q?: string
}) => {
  let fetchUrl = `${SOLR_BASE_PATH}?rows=${params.pageSize}&start=${params.pageSize * params.page}`

  if (params.sort) {
    fetchUrl += `&sort=${params.sort.key} ${params.sort.order}`
  }

  fetchUrl += `&q=${params.q ?? '*:*'}`

  return fetchUrl
}
