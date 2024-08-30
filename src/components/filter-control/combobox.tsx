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
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import Fuse from 'fuse.js'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

const MAX_NUM_ITEMS = 100

interface ComboboxProps {
  disabled?: boolean
  emptyLabel: string
  options?: { label: string; value: string }[]
  placeholder: string
  value?: string
  setValue: (value: string) => void
}

export const Combobox = ({
  disabled,
  emptyLabel,
  options = [],
  placeholder,
  value,
  setValue,
}: ComboboxProps) => {
  const [searchString, setSearchString] = useState('')
  const debouncedSearchString = useDebounce(searchString, 200)
  const [open, setOpen] = useState(false)

  const items = useMemo(() => {
    const fuse = new Fuse(options, {
      includeScore: true,
      keys: ['label'],
    })
    return debouncedSearchString.length
      ? fuse
          .search(debouncedSearchString, { limit: MAX_NUM_ITEMS })
          .map(({ item }) => item)
      : options.slice(0, MAX_NUM_ITEMS)
  }, [debouncedSearchString, options])

  const selectedItem = items.find((f) => f.value === value)

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn('w-full', selectedItem ? 'justify-start' : undefined)}
            disabled={disabled}
            variant="outline"
          >
            {selectedItem ? (
              selectedItem.label
            ) : (
              <>
                {emptyLabel}
                <PlusIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder}
              value={searchString}
              onValueChange={(value) => setSearchString(value)}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(value) => {
                      setValue(value)
                      setOpen(false)
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        item.value === value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span>{item.label}</span>
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
