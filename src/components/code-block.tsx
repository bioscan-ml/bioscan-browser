import { CopyIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

interface CodeBlockProps {
  code: string
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  return (
    <div className="relative">
      <div className="p-4 bg-muted rounded-sm overflow-auto">
        <pre className="text-xs text-muted-foreground">{code}</pre>
      </div>
      <Button
        variant="outline"
        size={copied ? 'default' : 'icon'}
        className="absolute bottom-2 right-2"
        onClick={() => {
          navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        {copied ? 'Copied!' : <CopyIcon className="w-4 h-4 " />}
      </Button>
    </div>
  )
}
