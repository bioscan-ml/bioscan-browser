import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FILTER_TYPES } from '@/lib/constants'
import { FacetCounts } from '@/types/response-data'
import { Filter } from '@/types/settings'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { FilterControl } from './filter-control'
import { SizeControl } from './size-control/size-control'

interface FiltersProps {
  facetCounts?: FacetCounts
  filters: Filter[]
  onAdd: (params: { key: string; value: string }) => void
  onClear: () => void
  onRemove: (params: { key: string; value: string }) => void
}

export const Filters = ({
  facetCounts,
  filters,
  onAdd,
  onClear,
  onRemove,
}: FiltersProps) => {
  const [open, setIsOpen] = useState(false)
  const filterCount = filters.reduce((previousValue, currentValue) => {
    previousValue += currentValue.values.length

    return previousValue
  }, 0)
  const label = filterCount ? `Filters (${filterCount})` : 'Filters'

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="relative" size="icon" variant="outline">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 p-0 overflow-y-auto">
        <SheetHeader className="sticky top-0 min-h-16 flex items-center justify-between gap-2 px-4 bg-muted border-b">
          <SheetTitle>{label}</SheetTitle>
          {filters.length ? (
            <Button onClick={onClear} variant="ghost">
              Clear
            </Button>
          ) : null}
        </SheetHeader>
        <div className="grow space-y-4 p-4">
          {FILTER_TYPES.map(({ key, label }) => {
            const values = filters.find((f) => f.key === key)?.values

            if (key === 'organism_area_mm2') {
              return (
                <SizeControl
                  key={key}
                  label={label}
                  onAdd={(value) => onAdd({ key, value })}
                  onRemove={(value) => onRemove({ key, value })}
                  values={values}
                />
              )
            }

            return (
              <FilterControl
                key={key}
                facetFields={facetCounts?.facet_fields[key]}
                label={label}
                onAdd={(value) => onAdd({ key, value })}
                onRemove={(value) => onRemove({ key, value })}
                values={values}
              />
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
