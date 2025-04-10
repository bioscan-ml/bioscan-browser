import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'id'

export const useId = () => {
  const [id, setId] = useSingleSearchParamsState(SEARCH_PARAM_KEY)

  return { id, setId }
}
