import { FILTER_TYPES } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { Filter } from '@/types/settings'
import { useSearchParams } from 'react-router-dom'

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = FILTER_TYPES.reduce(
    (previousValue: Filter[], currentValue) => {
      const values = searchParams.getAll(currentValue.key)

      if (values.length) {
        previousValue = [...previousValue, { key: currentValue.key, values }]
      }

      return previousValue
    },
    [],
  )

  const setFilters = (filters: Filter[]) => {
    FILTER_TYPES.forEach(({ key }) => searchParams.delete(key))

    filters.forEach((filter) =>
      filter.values.forEach((value) => searchParams.append(filter.key, value)),
    )

    searchParams.sort()
    setSearchParams(searchParams)
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
