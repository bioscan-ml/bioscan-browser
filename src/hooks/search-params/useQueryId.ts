import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'queryid'

export const useQueryId = () => {
  const [queryId, setQueryId] = useSingleSearchParamsState(SEARCH_PARAM_KEY)

  return { queryId, setQueryId }
}
