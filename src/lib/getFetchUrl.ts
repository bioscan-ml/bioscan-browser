import { Sort } from '@/types/settings'

const BASE_PATH = '/api/scene-toolkit/solr/bioscan5m/select'

export const getFetchUrl = (params: {
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
