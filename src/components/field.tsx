import { InfoIcon } from 'lucide-react'
import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export const Field = ({
  children,
  label,
  tooltip,
}: {
  children: ReactNode
  label: string
  tooltip?: string
}) => (
  <div className="flex flex-col items-start text-sm overflow-auto">
    <div className="sticky left-0 flex items-center gap-2">
      <span className="font-medium text-muted-foreground">{label}</span>
      {tooltip ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent className="max-w-72" side="bottom">
                <p className="whitespace-pre-line">{tooltip}</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
    {children}
  </div>
)
