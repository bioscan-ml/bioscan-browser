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
import Fuse from 'fuse.js'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { badgeVariants } from '../ui/badge'

const MAX_NUM_ITEMS = 100

interface ComboboxProps {
  label: string
  onSelect: (value: string) => void
  options?: { label: string; value: string }[]
  placeholder: string
}

export const Combobox = ({
  label,
  onSelect,
  options = [],
  placeholder,
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={badgeVariants({ variant: 'outline' })}>
          <span>{label}</span>
          <PlusIcon className="w-3 h-3 ml-2" />
        </button>
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
                    onSelect(value)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
