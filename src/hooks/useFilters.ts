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
    addFilter: ({ type, value }: { type: string; value: string }) => {
      const currentFilter = filters.find((f) => f.type === type)

      if (currentFilter) {
        if (!currentFilter.value.includes(value)) {
          // Update current filter
          const filter = {
            type,
            value: [...currentFilter.value, value],
          }
          setFilters([...filters.filter((f) => f.type !== type), filter])
        }
      } else {
        // Add new filter
        setFilters([...filters, { type, value: [value] }])
      }
    },
    removeFilter: ({ type, value }: { type: string; value: string }) => {
      const currentFilter = filters.find((f) => f.type === type)

      if (currentFilter) {
        // Update current filter
        const filter = {
          type,
          value: currentFilter.value.filter((v) => v !== value),
        }
        setFilters([
          ...filters.filter((f) => f.type !== type),
          ...(filter.value.length ? [filter] : []),
        ])
      }
    },
    clearFilters: () => setFilters([]),
  }
}
