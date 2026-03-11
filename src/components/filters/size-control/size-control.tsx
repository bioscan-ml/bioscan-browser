import { FormField } from '@/components/form-field'
import { badgeVariants } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ChevronsUpDownIcon, PlusIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LogScaleSlider } from './log-scale-slider'

const MIN = 0
const MAX = 10000

const ERROR_MESSAGES = {
  INVALID: 'Max value has to be larger than min value.',
  REQUIRED: 'This field is required.',
  TOO_LARGE: `Please enter a number smaller than ${MAX.toLocaleString()}.`,
  TOO_SMALL: `Please enter a number larger than ${MIN.toLocaleString}.`,
}

interface FilterControlProps {
  label: string
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  values?: string[]
}

export const SizeControl = ({
  label,
  onAdd,
  onRemove,
  values = [],
}: FilterControlProps) => {
  const [open, setIsOpen] = useState(!!values.length)
  const { control, formState, handleSubmit, reset, setValue, watch } = useForm<{
    minValue: number
    maxValue: number
  }>({ defaultValues: { minValue: MIN, maxValue: MAX } })
  const minValue = watch('minValue') ?? MIN
  const maxValue = watch('maxValue') ?? MAX

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
            <div className="col-span-2">
              <LogScaleSlider
                max={MAX}
                min={MIN}
                onValueChange={(value) => {
                  setValue('minValue', value[0], { shouldDirty: true })
                  setValue('maxValue', value[1], { shouldDirty: true })
                }}
                steps={7 * 14}
                value={[minValue, maxValue]}
              />
            </div>
            <Controller
              control={control}
              rules={{
                min: { value: MIN, message: ERROR_MESSAGES.TOO_SMALL },
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
                min: { value: minValue, message: ERROR_MESSAGES.INVALID },
                max: { value: MAX, message: ERROR_MESSAGES.TOO_LARGE },
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
            {formState.isDirty ? (
              <Button
                onClick={() => reset()}
                size="sm"
                type="button"
                variant="ghost"
              >
                Clear
              </Button>
            ) : null}
            <Button size="sm" type="submit">
              <span>Add</span>
              <PlusIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  )
}
