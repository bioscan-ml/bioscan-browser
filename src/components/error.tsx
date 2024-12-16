import { RESOURCES } from '@/lib/constants'
import { AlertCircleIcon, ExternalLinkIcon } from 'lucide-react'
import { buttonVariants } from './ui/button'

interface ErrorProps {
  message?: string
  title?: string
}

const DEFAULT_TITLE = 'Something went wrong'
const DEFAULT_MESSAGE = 'Could not load records, please try again later.'

export const Error = ({
  message = DEFAULT_MESSAGE,
  title = DEFAULT_TITLE,
}: ErrorProps) => (
  <div className="text-center space-y-8 p-16">
    <AlertCircleIcon className="text-destructive inline" />
    <div>
      <p className="text-xl font-medium mb-2">{title}</p>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
    <a
      href={RESOURCES.SYSTEM_STATUS}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({
        variant: 'outline',
      })}
    >
      System status
      <ExternalLinkIcon className="h-4 w-4 ml-3" />
    </a>
  </div>
)
