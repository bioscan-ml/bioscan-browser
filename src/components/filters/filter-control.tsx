import { badgeVariants } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { buttonVariants } from '../ui/button'
import { Combobox } from './combobox'

interface FilterControlProps {
  facetFields?: (string | number)[]
  label: string
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  values?: string[]
}

export const FilterControl = ({
  facetFields,
  label,
  onAdd,
  onRemove,
  values = [],
}: FilterControlProps) => {
  const [open, setIsOpen] = useState(!!values.length)
  const options = facetFields
    ?.filter((item) => typeof item === 'string')
    .map((value) => ({
      label: `${value}`,
      value: `${value}`,
    }))

  return (
    <Collapsible open={open} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(buttonVariants({ variant: 'outline' }), 'w-full', {
          'bg-muted rounded-b-none': open,
        })}
      >
        <span className="text-sm font-medium grow text-left">
          {values.length ? `${label} (${values.length})` : label}
        </span>
        <ChevronsUpDownIcon className="w-4 h-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border-x border-b rounded-b-md">
        <div className="flex items-center gap-2 flex-wrap">
          {values.map((value) => (
            <button
              key={value}
              className={badgeVariants()}
              onClick={() => onRemove(value)}
            >
              <span>{value}</span>
              <XIcon className="w-3 h-3 ml-2" />
            </button>
          ))}
          <Combobox
            label="Add"
            options={options}
            placeholder="Search value..."
            onSelect={onAdd}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
