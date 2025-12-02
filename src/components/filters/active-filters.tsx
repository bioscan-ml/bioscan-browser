import { badgeVariants } from '@/components/ui/badge'
import { FILTER_TYPES } from '@/lib/constants'
import { Filter } from '@/types/settings'
import { XIcon } from 'lucide-react'
import { Fragment } from 'react'

interface FilterControlProps {
  filters: Filter[]
  onRemove: (params: { key: string; value: string }) => void
}

export const ActiveFilters = ({ filters, onRemove }: FilterControlProps) => (
  <div className="flex items-center gap-2 flex-wrap">
    {filters.map((filter) => {
      const label = FILTER_TYPES.find((f) => f.key === filter.key)?.label

      if (!label) {
        return null
      }

      return (
        <Fragment key={filter.key}>
          {filter.values.map((value) => (
            <button
              key={value}
              className={badgeVariants()}
              onClick={() => onRemove({ key: filter.key, value })}
            >
              <span>
                {label}: {value}
              </span>
              <XIcon className="w-3 h-3 ml-2" />
            </button>
          ))}
        </Fragment>
      )
    })}
  </div>
)
