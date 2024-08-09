import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'taxon'

export const useTaxon = (defaultTaxon: string) => {
  const [selectedNodeId, setSelectedNodeId] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY,
    defaultTaxon,
  )

  return { selectedNodeId, setSelectedNodeId }
}
