import { REQUEST_TIMEOUT } from '@/lib/constants'
import { getFetchUrl } from '@/lib/getFetchUrl'
import { Doc, FacetCounts } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'
import { useSampleRecords } from './useSampleRecords'

const QUERY_KEY = 'records'

export const useRecords = (
  params: {
    facet?: boolean
    q?: string
    page: number
    pageSize: number
    sort?: Sort
  },
  enabled?: boolean,
) => {
  const { data: fallbackData } = useSampleRecords()
  const { isPending, isLoading, error, data } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
    facet_counts?: FacetCounts
  }>({
    enabled,
    queryKey: [QUERY_KEY, params],
    queryFn: async () => {
      const res = await fetch(getFetchUrl(params), {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      })

      if (!res.ok) {
        throw Error()
      }

      return await res.json()
    },
    retry: false,
  })

  return {
    isLoading,
    isPending,
    error,
    data: data?.response
      ? {
          ...data.response,
          facetCounts: data.facet_counts,
        }
      : error
        ? fallbackData
        : undefined,
  }
}
