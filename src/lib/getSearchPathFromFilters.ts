import { PATHS } from './constants'

// Builds a Search page location (pathname + query string) from BioChat's
// `bioscan_action.filters`. Those filter keys (family/order/genus/species/
// country) already match the Search page's own filter param keys (see
// FILTER_TYPES in constants.ts), so no key translation is needed -- values
// just need URL-encoding for cases like "Costa Rica".
export const getSearchPathFromFilters = (filters: Record<string, string>) => {
  const searchParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value)
    }
  })

  return { pathname: PATHS.SEARCH, search: searchParams.toString() }
}
