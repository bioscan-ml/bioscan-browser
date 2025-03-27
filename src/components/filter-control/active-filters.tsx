import { FILTER_TYPES } from '@/lib/constants'
import { Filter } from '@/types/settings'
import { X } from 'lucide-react'
import { Badge } from '../ui/badge'

interface ActiveFiltersProps {
  filters: Filter[]
  onRemove: (type: string) => void
}

export const ActiveFilters = ({ filters, onRemove }: ActiveFiltersProps) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {filters.map((filter, index) => (
      <Badge
        className="cursor-pointer"
        key={index}
        onClick={() => onRemove(filter.type)}
      >
        {
          FILTER_TYPES.find((filterType) => filterType.key === filter.type)
            ?.label
        }
        : {filter.value.join(', ')}
        <X className="w-3 h-3 ml-2" />
      </Badge>
    ))}
  </div>
)
