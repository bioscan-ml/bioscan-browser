import { badgeVariants } from '@/components/ui/badge'
import { FILTER_TYPES } from '@/lib/constants'
import { Filter } from '@/types/settings'
import { XIcon } from 'lucide-react'

interface ActiveFiltersProps {
  filters: Filter[]
  onRemove: (type: string) => void
}

export const ActiveFilters = ({ filters, onRemove }: ActiveFiltersProps) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {filters.map((filter, index) => {
      const label = FILTER_TYPES.find(
        (filterType) => filterType.key === filter.type,
      )?.label

      if (!label) {
        return null
      }

      return (
        <button
          key={index}
          className={badgeVariants()}
          onClick={() => onRemove(filter.type)}
        >
          <span>
            {label}: {filter.value.join(', ')}
          </span>
          <XIcon className="w-3 h-3 ml-2" />
        </button>
      )
    })}
  </div>
)
