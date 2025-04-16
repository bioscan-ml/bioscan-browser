import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PATHS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Doc } from '@/types/response-data'
import { SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface FindSimilarControlProps {
  doc: Doc
  className?: string
  size?: 'icon' | 'sm'
  variant?: 'ghost' | 'outline'
}

export const FindSimilarControl = ({
  doc,
  className,
  size = 'icon',
  variant = 'ghost',
}: FindSimilarControlProps) => {
  if (size === 'sm') {
    return (
      <Link
        className={cn(buttonVariants({ size, variant }), className)}
        to={{
          pathname: PATHS.FIND_SIMILAR,
          search: `queryid=${doc.id}`,
        }}
      >
        <SearchIcon className="w-4 h-4 mr-2" />
        Find similar
      </Link>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={cn(buttonVariants({ size, variant }), className)}
            to={{
              pathname: PATHS.FIND_SIMILAR,
              search: `queryid=${doc.id}`,
            }}
          >
            <SearchIcon className="w-4 h-4" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Find similar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
