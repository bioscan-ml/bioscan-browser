import { useToast } from '@/components/ui/toast/use-toast'
import { CopyIcon } from 'lucide-react'
import { Button } from './ui/button'

interface CodeBlockProps {
  code: string
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  const { toast } = useToast()

  return (
    <div className="relative">
      <div className="p-4 bg-muted rounded-sm overflow-auto">
        <pre className="text-xs text-muted-foreground">{code}</pre>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-2 right-2"
        onClick={() => {
          navigator.clipboard.writeText(code)
          toast({ description: 'Copied to clipboard!' })
        }}
      >
        <CopyIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}
