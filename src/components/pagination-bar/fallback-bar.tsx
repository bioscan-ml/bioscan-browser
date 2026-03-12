import { RESOURCES } from '@/lib/constants'
import { AlertCircleIcon, ExternalLinkIcon } from 'lucide-react'
import { PageContent } from '../page-content'

export const FallbackBar = () => (
  <div className="fixed bottom-0 left-0 w-full h-16 bg-muted/95 border-t">
    <PageContent>
      <div className="h-full flex items-center justify-center gap-4 text-center">
        <span className="text-sm text-muted-foreground">
          <AlertCircleIcon className="inline w-4 h-4 shrink-0 text-destructive mr-2" />
          Full dataset could not be loaded. You are seeing a sample.
        </span>
        <a
          className="hidden text-sm text-link sm:inline"
          href={RESOURCES.SYSTEM_STATUS}
          rel="noopener noreferrer"
          target="_blank"
        >
          System status
          <ExternalLinkIcon className="inline w-4 h-4 shrink-0 ml-2" />
        </a>
      </div>
    </PageContent>
  </div>
)
