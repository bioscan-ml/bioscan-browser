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
  className?: string
  doc: Doc
  size?: 'default' | 'icon'
  variant?: 'ghost' | 'outline'
}

export const FindSimilarControl = ({
  className,
  doc,
  size = 'default',
  variant = 'ghost',
}: FindSimilarControlProps) => {
  if (size === 'icon') {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className={cn(buttonVariants({ size, variant }), className)}
              to={{
                pathname: PATHS.FIND_SIMILAR,
                search: `id=${doc.id}`,
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

  return (
    <Link
      className={cn(buttonVariants({ size, variant }), className)}
      to={{
        pathname: PATHS.FIND_SIMILAR,
        search: `id=${doc.id}`,
      }}
    >
      <SearchIcon className="w-4 h-4 mr-2" />
      Find similar
    </Link>
  )
}
