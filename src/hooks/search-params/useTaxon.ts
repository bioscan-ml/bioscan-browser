import { useSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'taxon'

export const useTaxon = (defaultTaxon: string) => {
  const [selectedNodeId, setSelectedNodeId] = useSearchParamsState(
    SEARCH_PARAM_KEY,
    defaultTaxon,
  )

  return { selectedNodeId, setSelectedNodeId }
}
