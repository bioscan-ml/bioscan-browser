import { Doc } from '@/types/response-data'
import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'record'

export const useActiveDoc = (docs?: Doc[]) => {
  const [activeDocId, setActiveDocId] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY,
    null,
  )

  return {
    activeDoc: docs?.find((doc) => doc.id === activeDocId),
    setActiveDoc: (doc?: Doc) => setActiveDocId(doc?.id ?? null),
  }
}
