import { Sort } from '@/types/settings'

const BASE_PATH = '/api/scene-toolkit/solr/bioscan5m/select'

export const getFetchUrl = (params: {
  page: number
  pageSize: number
  sort: Sort
}) =>
  `${BASE_PATH}?q=*%3A*&rows=${params.pageSize}&start=${params.pageSize * params.page}&sort=${params.sort.key} ${params.sort.order}`
