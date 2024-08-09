import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FILTER_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface TypePickerProps {
  type?: string
  setType: (type: string) => void
}

export const TypePicker = ({ type, setType }: TypePickerProps) => {
  const [open, setOpen] = useState(false)
  const selectedFilterType = FILTER_TYPES.find((f) => f.key === type)

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedFilterType ? (
              selectedFilterType.label
            ) : (
              <>
                Set type
                <PlusIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search type..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {FILTER_TYPES.map((filter) => (
                  <CommandItem
                    key={filter.key}
                    value={filter.key}
                    onSelect={(value) => {
                      setType(value)
                      setOpen(false)
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        filter.key === type ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span>{filter.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
