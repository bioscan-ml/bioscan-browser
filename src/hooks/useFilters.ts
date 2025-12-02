import { filtersToQuery } from '@/lib/filtersToQuery'
import { Filter } from '@/types/settings'
import { useSearchParamsState } from './search-params/useSearchParamsState'

const SEARCH_PARAM_KEY = 'filter'

export const useFilters = () => {
  const [_filters, _setFilters] = useSearchParamsState(SEARCH_PARAM_KEY)

  const filters: Filter[] =
    _filters?.map((filter) => {
      const [key, ...rest] = filter.split(':')
      const _values = rest.join(':')
      const values = _values.split(',')

      return { key, values }
    }) ?? []

  const setFilters = (filters: Filter[]) => {
    _setFilters(
      filters.map((filter) => `${filter.key}:${filter.values.join(',')}`),
    )
  }

  return {
    filters,
    filterQuery: filtersToQuery(filters),
    addFilter: ({ key, value }: { key: string; value: string }) => {
      const currentFilter = filters.find((f) => f.key === key)

      if (currentFilter) {
        if (!currentFilter.values.includes(value)) {
          // Update current filter
          const filter = {
            key,
            values: [...currentFilter.values, value],
          }
          setFilters([...filters.filter((f) => f.key !== key), filter])
        }
      } else {
        // Add new filter
        setFilters([...filters, { key, values: [value] }])
      }
    },
    removeFilter: ({ key, value }: { key: string; value: string }) => {
      const currentFilter = filters.find((f) => f.key === key)

      if (currentFilter) {
        // Update current filter
        const filter = {
          key,
          values: currentFilter.values.filter((v) => v !== value),
        }
        setFilters([
          ...filters.filter((f) => f.key !== key),
          ...(filter.values.length ? [filter] : []),
        ])
      }
    },
    clearFilters: () => setFilters([]),
  }
}
