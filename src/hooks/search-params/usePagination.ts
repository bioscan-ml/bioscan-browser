import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY_PAGE = 'page'
const SEARCH_PARAM_KEY_PAGE_SIZE = 'pageSize'

export const usePagination = (defaultPagination: {
  page: number
  pageSize: number
}) => {
  const [pageParam, setPageParam] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY_PAGE,
    `${defaultPagination.page + 1}`,
  )

  const [pageSizeParam, setPageSizeParam] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY_PAGE_SIZE,
    `${defaultPagination.pageSize}`,
  )

  return {
    page: Number(pageParam) - 1,
    pageSize: Number(pageSizeParam),
    setPage: (page: number) => setPageParam(`${page + 1}`),
    setPageSize: (pageSize: number) => setPageSizeParam(`${pageSize}`),
  }
}
