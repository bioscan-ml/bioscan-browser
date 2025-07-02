import { Doc } from '@/types/response-data'
import { useRecord } from '../useRecord'
import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'record'

export const useActiveDoc = (docs?: Doc[]) => {
  const [activeDocId, setActiveDocId] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY,
    null,
  )
  const doc = docs?.find((doc) => doc.id === activeDocId)
  const { data } = useRecord({ id: activeDocId, enabled: !doc })

  return {
    activeDoc: doc ?? data,
    setActiveDoc: (doc?: Doc) => setActiveDocId(doc?.id ?? null),
  }
}
