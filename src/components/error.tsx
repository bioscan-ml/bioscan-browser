import { AlertCircleIcon } from 'lucide-react'

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
  </div>
)
