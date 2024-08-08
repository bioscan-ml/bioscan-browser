import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Filter } from '@/types/settings'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ActiveFilters } from './active-filters'
import { AddFilterForm } from './add-filter-form'

interface FilterControlProps {
  filters: Filter[]
  onAdd: (filter: Filter) => void
  onClear: () => void
  onRemove: (type: string) => void
}

export const FilterControl = ({
  filters,
  onAdd,
  onClear,
  onRemove,
}: FilterControlProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {filters.length ? (
        <ActiveFilters filters={filters} onRemove={onRemove} />
      ) : null}
      <div className="space-x-2">
        <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Add
              <PlusIcon className="w-4 h-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="right" align="start" className="space-y-6">
            <AddFilterForm
              onAdd={(filter) => {
                onAdd(filter)
                setIsOpen(false)
              }}
              onCancel={() => setIsOpen(false)}
            />
          </PopoverContent>
        </Popover>
        {filters.length ? (
          <Button variant="ghost" onClick={() => onClear()}>
            Clear all
          </Button>
        ) : null}
      </div>
    </div>
  )
}
