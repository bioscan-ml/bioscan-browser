import { Button } from '@/components/ui/button'
import { LinkIcon } from 'lucide-react'
import { useToast } from './ui/toast/use-toast'

interface CopyLinkControlProps {
  link: string
}

export const CopyLinkControl = ({ link }: CopyLinkControlProps) => {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(link)
        toast({ description: 'Copied to clipboard!' })
      }}
      size="icon"
      type="button"
      variant="ghost"
    >
      <LinkIcon className="w-4 h-4" />
    </Button>
  )
}
