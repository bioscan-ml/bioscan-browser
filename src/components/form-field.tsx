import { InfoIcon } from 'lucide-react'
import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export const FormField = ({
  children,
  error,
  label,
  tooltip,
}: {
  children: ReactNode
  error?: string
  label: string
  tooltip?: string
}) => (
  <div className="flex flex-col items-start gap-2 text-sm">
    <div className="flex items-center gap-2">
      <span className="font-medium text-muted-foreground">{label}</span>
      {tooltip ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent className="max-w-72" side="bottom">
                <p>{tooltip}</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
    {children}
    {error ? (
      <span className="text-xs text-destructive italic">{error}</span>
    ) : null}
  </div>
)
