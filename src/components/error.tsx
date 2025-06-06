import { RESOURCES } from '@/lib/constants'
import { AlertCircleIcon, ExternalLinkIcon, RotateCcwIcon } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'

interface ErrorProps {
  message?: string
  title?: string
  retry?: () => void
}

const DEFAULT_TITLE = 'Something went wrong'
const DEFAULT_MESSAGE = 'Could not load records, please try again later.'

export const Error = ({
  message = DEFAULT_MESSAGE,
  title = DEFAULT_TITLE,
  retry,
}: ErrorProps) => (
  <div className="flex flex-col items-center gap-8 p-16 text-center">
    <AlertCircleIcon className="text-destructive inline" />
    <div>
      <p className="text-xl font-medium mb-2">{title}</p>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
    {retry ? (
      <Button onClick={retry} variant="outline" className="shrink-0">
        Retry
        <RotateCcwIcon className="w-4 h-4 ml-2" />
      </Button>
    ) : null}
    <a
      href={RESOURCES.SYSTEM_STATUS}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({
        variant: 'ghost',
      })}
    >
      System status
      <ExternalLinkIcon className="h-4 w-4 ml-3" />
    </a>
  </div>
)
