import { badgeVariants } from '@/components/ui/badge'
import { FILTER_TYPES } from '@/lib/constants'
import { Filter } from '@/types/settings'
import { XIcon } from 'lucide-react'

interface FilterControlProps {
  filters: Filter[]
  onRemove: (params: { type: string; value: string }) => void
}

export const ActiveFilters = ({ filters, onRemove }: FilterControlProps) => (
  <div className="flex items-center gap-2 flex-wrap">
    {filters.map((filter) => {
      const label = FILTER_TYPES.find((f) => f.key === filter.type)?.label

      if (!label) {
        return null
      }

      return (
        <>
          {filter.value.map((value) => (
            <button
              key={value}
              className={badgeVariants()}
              onClick={() => onRemove({ type: filter.type, value })}
            >
              <span>
                {label}: {value}
              </span>
              <XIcon className="w-3 h-3 ml-2" />
            </button>
          ))}
        </>
      )
    })}
  </div>
)
