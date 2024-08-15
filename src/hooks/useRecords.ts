import { Doc, FacetCounts } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'records'
const BASE_PATH = '/api/scene-toolkit/solr/bioscan5m/select'
const FACET = {
  MIN_COUNT: 1,
  LIMIT: 25000,
  FIELDS: [
    'country',
    'province_state',
    'class',
    'order',
    'family',
    'subfamily',
    'genus',
    'species',
    'split',
  ],
}

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
      const fetchUrl = getFetchUrl(params)
      const fetchSettings = getFetchSettings(params.facet)
      const res = await fetch(fetchUrl, fetchSettings)

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
  let fetchUrl = `${BASE_PATH}?rows=${params.pageSize}&start=${params.pageSize * params.page}`

  if (params.sort) {
    fetchUrl += `&sort=${params.sort.key} ${params.sort.order}`
  }

  fetchUrl += `&q=${params.q ?? '*:*'}`

  return fetchUrl
}

const getFetchSettings = (facet?: boolean) => {
  if (!facet) {
    return
  }

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
