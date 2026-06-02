import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PATHS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { Doc } from '@/types/response-data'
import { FlagIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ReportIssueControlProps {
  className?: string
  doc: Doc
  size?: 'default' | 'icon'
  variant?: 'ghost' | 'outline'
}

export const ReportIssueControl = ({
  className,
  doc,
  size = 'default',
  variant = 'ghost',
}: ReportIssueControlProps) => {
  if (size === 'icon') {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className={cn(buttonVariants({ size, variant }), className)}
              to={{
                pathname: PATHS.REPORT,
                search: `id=${doc.id}`,
              }}
            >
              <FlagIcon className="w-4 h-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Report issue</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Link
      className={cn(buttonVariants({ size, variant }), className)}
      to={{
        pathname: PATHS.REPORT,
        search: `id=${doc.id}`,
      }}
    >
      <FlagIcon className="w-4 h-4 mr-2" />
      Report issue
    </Link>
  )
}
