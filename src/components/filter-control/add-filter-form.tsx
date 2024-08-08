import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FILTER_TYPES } from '@/lib/constants'
import { Filter } from '@/types/settings'
import { useState } from 'react'
import { Button } from '../ui/button'

const DEFAULT_TYPE = FILTER_TYPES[0].key
const DEFAULT_VALUE = ''

interface AddFilterFormProps {
  onAdd: (filter: Filter) => void
  onCancel: () => void
}

export const AddFilterForm = ({ onAdd, onCancel }: AddFilterFormProps) => {
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
