import { badgeVariants } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Filter } from '@/types/settings'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { buttonVariants } from '../ui/button'
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
  const [open, setIsOpen] = useState(false)
  const valueOptions = facetFields
    ?.filter((item) => typeof item === 'string')
    .map((value) => ({
      label: value,
      value,
    }))
  const values = filter?.value ?? []

  return (
    <Collapsible open={open} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: values.length ? 'default' : 'outline' }),
          'w-full',
          {
            'rounded-b-none': open,
          },
        )}
      >
        <span className="text-sm font-medium grow text-left">
          {values.length ? `${label} (${values.length})` : label}
        </span>
        <ChevronsUpDownIcon className="w-4 h-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border-x border-b rounded-b-md">
        <div>
          {valueOptions?.length ? (
            <div className="flex items-center gap-2 flex-wrap">
              {values.map((value) => (
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
      </CollapsibleContent>
    </Collapsible>
  )
}
