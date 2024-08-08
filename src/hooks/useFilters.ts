import { Filter } from '@/types/settings'
import { useState } from 'react'

export const useFilters = () => {
  const [filters, setFilters] = useState<Filter[]>([])

  return {
    filters,
    addFilter: (filter: Filter) => {
      const currentFilter = filters.find((f) => f.type === filter.type)

      if (currentFilter) {
        // Update current filter
        setFilters([
          ...filters.filter((f) => f.type !== filter.type),
          {
            type: filter.type,
            value: `${currentFilter.value}, ${filter.value}`,
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
