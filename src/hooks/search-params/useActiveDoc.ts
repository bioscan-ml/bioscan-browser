import { Doc } from '@/types/response-data'
import { useSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'doc'

export const useActiveDoc = (docs?: Doc[]) => {
  const [activeDocId, setActiveDocId] = useSearchParamsState(
    SEARCH_PARAM_KEY,
    null,
  )

  return {
    activeDoc: docs?.find((doc) => doc.id === activeDocId),
    setActiveDoc: (doc?: Doc) => setActiveDocId(doc?.id ?? null),
  }
}
