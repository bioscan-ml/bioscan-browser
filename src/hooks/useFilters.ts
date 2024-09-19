import { filtersToQuery } from '@/lib/filtersToQuery'
import { Filter } from '@/types/settings'
import { useSearchParamsState } from './search-params/useSearchParamsState'

const SEARCH_PARAM_KEY = 'filter'

export const useFilters = () => {
  const [_filters, _setFilters] = useSearchParamsState(SEARCH_PARAM_KEY)

  const filters: Filter[] =
    _filters?.map((filter) => {
      const [type, ...rest] = filter.split(':')
      const _value = rest.join(':')
      const value = _value.split(',')

      return { type, value }
    }) ?? []

  const setFilters = (filters: Filter[]) => {
    _setFilters(
      filters.map((filter) => `${filter.type}:${filter.value.join(',')}`),
    )
  }

  return {
    filters,
    filterQuery: filtersToQuery(filters),
    addFilter: (filter: Filter) => {
      const currentFilter = filters.find((f) => f.type === filter.type)

      if (currentFilter) {
        // Update current filter
        setFilters([
          ...filters.filter((f) => f.type !== filter.type),
          {
            type: filter.type,
            value: [
              ...currentFilter.value,
              ...filter.value.filter((f) => !currentFilter.value.includes(f)),
            ],
          },
        ])
      } else {
        // Add new filter
        setFilters([...filters, filter])
      }
    },
    removeFilter: (type: string) =>
      setFilters(filters.filter((f) => f.type !== type)),
    clearFilters: () => setFilters([]),
  }
}
