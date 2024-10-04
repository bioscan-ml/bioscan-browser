import { SOLR_BASE_PATH } from '@/lib/constants'
import { Doc, FacetCounts } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const QUERY_KEY = 'records'

export const useRecords = (params: {
  facet?: boolean
  q?: string
  page: number
  pageSize: number
  sort?: Sort
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
    retry: false,
  })

  const docs = useMemo(
    () =>
      data?.response.docs.map((doc) => {
        // Force cast collectors array to string
        if (typeof doc.collectors === 'object') {
          return {
            ...doc,
            collectors: (doc.collectors as string[]).join(', '),
          }
        }

        return doc
      }),
    [data],
  )

  return {
    isPending,
    error,
    data: data
      ? {
          ...data.response,
          docs,
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
