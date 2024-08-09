import { Input } from '@/components/ui/input'
import { Filter } from '@/types/settings'
import { useState } from 'react'
import { Button } from '../ui/button'
import { TypePicker } from './type-picker'

interface AddFilterFormProps {
  onAdd: (filter: Filter) => void
  onCancel: () => void
}

export const AddFilterForm = ({ onAdd, onCancel }: AddFilterFormProps) => {
  const [type, setType] = useState<string>()
  const [value, setValue] = useState('')

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <TypePicker type={type} setType={setType} />
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
          disabled={!type || !value.length}
          variant="default"
          onClick={() => {
            if (type && value.length) {
              onAdd({ type, value: [value] })
            }
          }}
        >
          Apply
        </Button>
      </div>
    </>
  )
}
