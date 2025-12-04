import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormField } from '../form-field'
import { badgeVariants } from '../ui/badge'
import { Button, buttonVariants } from '../ui/button'
import { Input } from '../ui/input'

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required.',
  POSITIVE_NUMBER: 'Please enter a positive number.',
}

interface FilterControlProps {
  label: string
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  values?: string[]
}

export const IntervalControl = ({
  label,
  onAdd,
  onRemove,
  values = [],
}: FilterControlProps) => {
  const [open, setIsOpen] = useState(!!values.length)
  const { control, handleSubmit, reset } = useForm<{
    minValue: number
    maxValue: number
  }>()

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
        {values.length ? (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
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
          </div>
        ) : null}
        <form
          onSubmit={handleSubmit((formData) => {
            onAdd(`${formData.minValue}-${formData.maxValue}`)
            reset()
          })}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              control={control}
              rules={{
                min: { value: 0, message: ERROR_MESSAGES.POSITIVE_NUMBER },
                required: ERROR_MESSAGES.REQUIRED,
              }}
              name="minValue"
              render={({ field, fieldState }) => (
                <FormField error={fieldState.error?.message} label="Min value">
                  <Input {...field} value={field.value ?? ''} type="number" />
                </FormField>
              )}
            />
            <Controller
              control={control}
              rules={{
                min: { value: 0, message: ERROR_MESSAGES.POSITIVE_NUMBER },
                required: ERROR_MESSAGES.REQUIRED,
              }}
              name="maxValue"
              render={({ field, fieldState }) => (
                <FormField error={fieldState.error?.message} label="Max value">
                  <Input {...field} value={field.value ?? ''} type="number" />
                </FormField>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={() => reset()}
              size="sm"
              type="button"
              variant="ghost"
            >
              Clear
            </Button>
            <Button size="sm" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  )
}
