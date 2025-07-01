import { useListIssues } from '@/hooks/github/useListIssues'
import {
  AlertCircleIcon,
  CircleCheckIcon,
  CircleDotIcon,
  CircleSlashIcon,
  ExternalLinkIcon,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export const IssueList = ({ id }: { id: string }) => {
  const { issues, isPending, error } = useListIssues(id)

  return (
    <div>
      {isPending ? (
        <span className="text-sm">Loading...</span>
      ) : error ? (
        <span className="text-sm">
          <AlertCircleIcon className="inline w-4 h-4 mr-2 text-destructive" />
          <span>Could not load issues</span>
        </span>
      ) : (
        <div className="flex flex-col items-start gap-2">
          {issues?.length ? (
            issues.map((issue) => (
              <div
                key={issue.id}
                className="w-full flex items-start justify-start"
              >
                <div className="h-5 flex items-center justify-center shrink-0 mr-2">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <IssueStateIcon
                          state={issue.state}
                          stateReason={issue.state_reason}
                        />
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent side="bottom">
                          <IssueStateLabel
                            state={issue.state}
                            stateReason={issue.state_reason}
                          />
                        </TooltipContent>
                      </TooltipPortal>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <a
                  className="inline text-sm text-link"
                  href={issue.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {issue.title}
                  <ExternalLinkIcon className="inline w-4 h-4 ml-2" />
                </a>
              </div>
            ))
          ) : (
            <span className="text-sm">No issues found</span>
          )}
        </div>
      )}
    </div>
  )
}

const IssueStateIcon = ({
  state,
  stateReason,
}: {
  state: string
  stateReason?: string | null
}) => {
  if (state === 'open') {
    return (
      <CircleDotIcon
        className="w-4 h-4 text-primary"
        style={{ color: '#1a7f37' }} // Using custom GitHub color
      />
    )
  }

  if (stateReason === 'completed') {
    return <CircleCheckIcon className="w-4 h-4" style={{ color: '#8250df' }} /> // Using custom GitHub color
  }

  return <CircleSlashIcon className="w-4 h-4" style={{ color: '#59636e' }} /> // Using custom GitHub color
}

const IssueStateLabel = ({
  state,
  stateReason,
}: {
  state: string
  stateReason?: string | null
}) => {
  if (state === 'open') {
    return <p>Open</p>
  }

  if (stateReason === 'completed') {
    return <p>Completed</p>
  }

  if (stateReason === 'not_planned') {
    return <p>Not planned</p>
  }

  return <p>Closed</p>
}
