import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode, useRef } from 'react'
import { Button } from './button'

export const UploadImage = ({
  children,
  onChange,
  size = 'default',
  tooltip,
}: {
  children: ReactNode
  onChange: (file?: File) => void
  size?: 'icon' | 'default'
  tooltip?: string
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        accept="image/png, image/gif, image/jpeg"
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0]
          onChange(file)
        }}
      />
      {tooltip ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="shrink-0"
                size={size}
                onClick={() => inputRef.current?.click()}
              >
                {children}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button
          variant="outline"
          className="shrink-0"
          size={size}
          onClick={() => inputRef.current?.click()}
        >
          {children}
        </Button>
      )}
    </>
  )
}
