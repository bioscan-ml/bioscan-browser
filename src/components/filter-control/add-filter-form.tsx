import { Input } from '@/components/ui/input'
import { FILTER_TYPES } from '@/lib/constants'
import { FacetCounts } from '@/types/response-data'
import { Filter } from '@/types/settings'
import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Combobox } from './combobox'

interface AddFilterFormProps {
  facetCounts?: FacetCounts
  onAdd: (filter: Filter) => void
  onCancel: () => void
}

export const AddFilterForm = ({
  facetCounts,
  onAdd,
  onCancel,
}: AddFilterFormProps) => {
  const [type, setType] = useState<string>()
  const [value, setValue] = useState('')
  const valueOptions = useMemo(
    () =>
      type
        ? facetCounts?.facet_fields[type]
            ?.filter((item) => typeof item === 'string')
            .map((value) => ({
              label: value,
              value,
            }))
        : undefined,
    [facetCounts?.facet_fields, type],
  )

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()

        if (type && value.length) {
          onAdd({ type, value: [value] })
        }
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Combobox
          emptyLabel="Set type"
          placeholder="Search type..."
          options={FILTER_TYPES.map((filterType) => ({
            label: filterType.label,
            value: filterType.key,
          }))}
          value={type}
          setValue={(type) => {
            setType(type)
            setValue('')
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Value</label>
        {!type || valueOptions?.length ? (
          <Combobox
            disabled={!type}
            emptyLabel="Set value"
            placeholder="Search value..."
            options={valueOptions}
            value={value}
            setValue={setValue}
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            onCancel()
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={!type || !value.length}
          type="submit"
          variant="default"
        >
          Apply
        </Button>
      </div>
    </form>
  )
}
