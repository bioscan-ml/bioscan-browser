import { useSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'page'

export const usePage = (defaultPage: number) => {
  const [pageParam, setPageParam] = useSearchParamsState(
    SEARCH_PARAM_KEY,
    `${defaultPage + 1}`,
  )

  return {
    page: Number(pageParam) - 1,
    setPage: (page: number) => setPageParam(`${page + 1}`),
  }
}
