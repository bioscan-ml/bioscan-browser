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
import { useState } from 'react'
import { FilterControl } from './filter-control'

interface AllFiltersProps {
  facetCounts?: FacetCounts
  filters: Filter[]
  onAdd: (filter: Filter) => void
  onClear: () => void
  onRemove: (type: string) => void
}

export const AllFilters = ({ facetCounts, filters }: AllFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">All filters</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 p-0 overflow-y-auto">
        <SheetHeader className="sticky top-0 p-4 bg-muted border-b">
          <SheetTitle>All filters</SheetTitle>
        </SheetHeader>
        <div className="grow space-y-4 p-4">
          {FILTER_TYPES.map(({ key, label }) => (
            <FilterControl
              key={key}
              facetFields={facetCounts?.facet_fields[key]}
              filter={filters.find((f) => f.type === key)}
              label={label}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
