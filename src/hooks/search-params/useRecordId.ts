import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'id'

export const useRecordId = () => {
  const [recordId, setRecordId] = useSingleSearchParamsState(SEARCH_PARAM_KEY)

  return { recordId, setRecordId }
}
