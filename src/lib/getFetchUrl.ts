const BASE_PATH = '/api/scene-toolkit/solr/bioscan5m/select'

export const getFetchUrl = (params: { rows: number; start: number }) =>
  `${BASE_PATH}?q=*%3A*&rows=${params.rows}&start=${params.start}`
