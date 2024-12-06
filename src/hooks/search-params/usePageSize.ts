import { useEffect } from 'react'
import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY_PAGE_SIZE = 'pageSize'
const PAGE_SIZE_MIN = 10
const PAGE_SIZE_MAX = 100
const DEFAULT_PAGE_SIZE = 10

const clampPageSize = (pageSize: number) =>
  Math.max(Math.min(pageSize, PAGE_SIZE_MAX), PAGE_SIZE_MIN)

export const usePageSize = () => {
  const [pageSizeParam, setPageSizeParam] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY_PAGE_SIZE,
    `${DEFAULT_PAGE_SIZE}`,
  )

  useEffect(() => {
    const pageSize = clampPageSize(Number(pageSizeParam))
    if (pageSize !== Number(pageSizeParam)) {
      setPageSizeParam(`${pageSize}`)
    }
  }, [pageSizeParam, setPageSizeParam])

  return {
    pageSize: clampPageSize(Number(pageSizeParam)),
    setPageSize: (pageSize: number) =>
      setPageSizeParam(`${clampPageSize(pageSize)}`),
  }
}
