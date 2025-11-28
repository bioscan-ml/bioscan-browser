import { badgeVariants } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Filter } from '@/types/settings'
import { XIcon } from 'lucide-react'
import { Combobox } from './combobox'

interface FilterControlProps {
  label: string
  filter?: Filter
  facetFields?: (string | number)[]
}

export const FilterControl = ({
  facetFields,
  filter,
  label,
}: FilterControlProps) => {
  const valueOptions = facetFields
    ?.filter((item) => typeof item === 'string')
    .map((value) => ({
      label: value,
      value,
    }))

  return (
    <div className="flex flex-col gap-2">
      <label className="py-1.5 text-sm leading-none font-medium">{label}</label>
      <div>
        {valueOptions?.length ? (
          <div className="flex items-center gap-2 flex-wrap">
            {filter?.value.map((value) => (
              <button
                className={badgeVariants()}
                onClick={() => {
                  /* TODO */
                }}
              >
                <span>{value}</span>
                <XIcon className="w-3 h-3 ml-2" />
              </button>
            ))}
            <Combobox
              label="Add"
              options={valueOptions}
              placeholder="Search value..."
              onSelect={() => {
                /* TODO */
              }}
            />
          </div>
        ) : (
          <Input
            value={filter?.value ?? ''}
            onChange={() => {
              /* TODO */
            }}
          />
        )}
      </div>
    </div>
  )
}
