import { Doc } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'records'
const BASE_PATH = '/api/scene-toolkit/solr/bioscan5m/select'

export const useRecords = (params: {
  page: number
  pageSize: number
  sort?: Sort
  q?: string
}) => {
  const { isPending, error, data } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
  }>({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetch(getFetchUrl(params)).then((res) => res.json()),
  })

  return { isPending, error, data: data?.response }
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
