import { PAGE_SIZE_OPTIONS } from '@/lib/constants'
import { useEffect } from 'react'
import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY_PAGE = 'page'
const SEARCH_PARAM_KEY_PAGE_SIZE = 'pageSize'

const PAGE_SIZE_MIN = PAGE_SIZE_OPTIONS[0]
const PAGE_SIZE_MAX = PAGE_SIZE_OPTIONS[PAGE_SIZE_OPTIONS.length - 1]

const clampPageSize = (pageSize: number) =>
  Math.max(Math.min(pageSize, PAGE_SIZE_MAX), PAGE_SIZE_MIN)

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
  useEffect(() => {
    const pageSize = clampPageSize(Number(pageSizeParam))
    if (pageSize !== Number(pageSizeParam)) {
      setPageSizeParam(`${pageSize}`)
    }
  }, [pageSizeParam, setPageSizeParam])

  return {
    page: Number(pageParam) - 1,
    pageSize: clampPageSize(Number(pageSizeParam)),
    setPage: (page: number) => setPageParam(`${page + 1}`),
    setPageSize: (pageSize: number) =>
      setPageSizeParam(`${clampPageSize(pageSize)}`),
  }
}
