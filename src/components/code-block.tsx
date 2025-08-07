import { useToast } from '@/components/ui/toast/use-toast'
import { cn } from '@/lib/utils'
import { ChevronsUpDown, CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface CodeBlockProps {
  code: string
  copyable?: boolean
  expandable?: boolean
}

export const CodeBlock = ({ code, copyable, expandable }: CodeBlockProps) => {
  const { toast } = useToast()
  const [expanded, setExpanded] = useState(expandable ? false : true)

  useEffect(() => {
    setExpanded(expandable ? false : true)
  }, [expandable])

  return (
    <div
      className={cn(
        'relative h-32 p-4 rounded-md border bg-muted overflow-hidden',
        {
          'h-auto overflow-auto': expanded,
        },
      )}
    >
      <pre className="text-xs text-muted-foreground">{code}</pre>
      <div className="flex gap-2 absolute top-2 right-2">
        {copyable ? (
          <Button
            onClick={() => {
              navigator.clipboard.writeText(code)
              toast({ description: 'Copied to clipboard!' })
            }}
            size="icon"
            type="button"
            variant="ghost"
          >
            <CopyIcon className="w-4 h-4" />
          </Button>
        ) : null}
        {expandable ? (
          <Button
            onClick={() => setExpanded(!expanded)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <ChevronsUpDown className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
      {expandable && !expanded ? (
        <div className="w-full h-12 absolute bottom-0 left-0 bg-gradient-to-b from-[transparent] to-muted" />
      ) : null}
    </div>
  )
}
