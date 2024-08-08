import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FILTER_TYPES } from '@/lib/constants'
import { Filter } from '@/types/settings'
import { PlusIcon, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const DEFAULT_TYPE = FILTER_TYPES[0].key
const DEFAULT_VALUE = ''

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

const ActiveFilters = ({
  filters,
  onRemove,
}: {
  filters: Filter[]
  onRemove: (type: string) => void
}) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {filters.map((filter, index) => (
      <Badge
        key={index}
        variant="secondary"
        className="cursor-pointer"
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

const AddFilterForm = ({
  onAdd,
  onCancel,
}: {
  onAdd: (filter: Filter) => void
  onCancel: () => void
}) => {
  const [type, setType] = useState(DEFAULT_TYPE)
  const [value, setValue] = useState('')

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select
          value={type}
          onValueChange={(type) => {
            setType(type)
            setValue(DEFAULT_VALUE)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            {FILTER_TYPES.map((filterType) => (
              <SelectItem key={filterType.key} value={filterType.key}>
                {filterType.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Value</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={() => onAdd({ type, value: [value] })}
          disabled={value.length === 0}
        >
          Apply
        </Button>
      </div>
    </>
  )
}
