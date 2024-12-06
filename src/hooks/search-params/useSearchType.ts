import { SearchType } from '@/types/settings'
import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY_FROM = 'from'
const SEARCH_PARAM_KEY_TO = 'to'
const DEFAULT_SEARCH_TYPE: SearchType = 'Image'

const isSearchType = (value: string | null): value is SearchType =>
  value ? ['Image', 'DNA'].includes(value) : false

export const useSearchType = () => {
  const [searchFromParam, setSearchFromParam] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY_FROM,
  )
  const [searchToParam, setSearchToParam] =
    useSingleSearchParamsState(SEARCH_PARAM_KEY_TO)

  return {
    searchFrom: isSearchType(searchFromParam)
      ? searchFromParam
      : DEFAULT_SEARCH_TYPE,
    setSearchFrom: (searchFrom: SearchType) => setSearchFromParam(searchFrom),
    searchTo: isSearchType(searchToParam) ? searchToParam : DEFAULT_SEARCH_TYPE,
    setSearchTo: (searchTo: SearchType) => setSearchToParam(searchTo),
  }
}
