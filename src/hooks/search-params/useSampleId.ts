import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'sampleid'

export const useSampleId = () => {
  const [sampleId, setSampleId] = useSingleSearchParamsState(SEARCH_PARAM_KEY)

  return { sampleId, setSampleId }
}
