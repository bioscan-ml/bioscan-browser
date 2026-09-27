import { SOLR_BASE_PATH } from '@/lib/apiPaths'
import { Sort } from '@/types/settings'

export const getFetchUrl = (params: {
  page: number
  pageSize: number
  sort?: Sort
  q?: string
}) => {
  let fetchUrl = `${SOLR_BASE_PATH}?rows=${params.pageSize}&start=${params.pageSize * params.page}`

  if (params.sort) {
    if (params.sort.order) {
      fetchUrl += `&sort=${params.sort.key} ${params.sort.order}`
    } else {
      fetchUrl += `&sort=${params.sort.key} asc`
    }
  }

  fetchUrl += `&q=${params.q ?? '*:*'}`

  return fetchUrl
}
