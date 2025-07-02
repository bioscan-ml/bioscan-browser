import { cn } from '@/lib/utils'
import { SearchIcon, X } from 'lucide-react'
import { Loader } from './loader'
import { Button } from './ui/button'
import { Input as InputPrimitive } from './ui/input'

export const Input = ({
  isLoading,
  placeholder,
  setValue,
  value,
  variant = 'default',
}: {
  isLoading?: boolean
  placeholder?: string
  setValue: (searchString: string) => void
  value: string
  variant?: 'default' | 'search'
}) => (
  <div className="relative">
    {variant === 'search' ? (
      <div className="w-10 h-10 absolute top-0 left-0 flex items-center justify-center">
        <SearchIcon className="w-4 h-4 text-muted-foreground" />
      </div>
    ) : null}
    <InputPrimitive
      className={cn({ 'px-10': variant === 'search' })}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
    <div className="absolute top-0 right-0 flex items-center justify-center">
      {isLoading ? (
        <Loader className="w-10 h-10 p-2" />
      ) : value.length ? (
        <Button
          aria-label="Clear"
          size="icon"
          variant="ghost"
          onClick={() => setValue('')}
        >
          <X className="w-4 h-4" />
        </Button>
      ) : null}
    </div>
  </div>
)
