import { Button, buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { ChatMessage } from '@/hooks/chatbot/useSendMessage'
import { cn } from '@/lib/cn'
import { ExternalLinkIcon, Loader2Icon, SendIcon } from 'lucide-react'
import { FormEvent } from 'react'

type ChatPanelProps = {
  messages: ChatMessage[]
  input: string
  onInputChange: (value: string) => void
  onSubmit: () => void
  isPending: boolean
  scrollAreaClassName?: string
}

// Message list + input form, shared by the dedicated /chatbot page and the
// floating chat widget.
export const ChatPanel = ({
  messages,
  input,
  onInputChange,
  onSubmit,
  isPending,
  scrollAreaClassName,
}: ChatPanelProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ScrollArea className={cn('flex-1 p-4', scrollAreaClassName)}>
        {messages.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            Start the conversation below.
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
          </div>
        )}
        {isPending ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
            <Loader2Icon className="w-4 h-4 animate-spin" />
            Thinking...
          </div>
        ) : null}
      </ScrollArea>
      <form
        className="flex items-end gap-2 border-t p-3"
        onSubmit={handleSubmit}
      >
        <Textarea
          className="min-h-10 resize-none"
          onChange={(e) => onInputChange(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSubmit()
            }
          }}
          placeholder="Type a message..."
          value={input}
        />
        <Button disabled={isPending || !input.trim()} size="icon" type="submit">
          <SendIcon className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}

// Copy shown in place of a link when the backend's `link.status` isn't
// "available" -- lets the user tell "this question just doesn't have
// browsable records" apart from "something went wrong".
const LINK_PLACEHOLDER_COPY: Record<string, string> = {
  no_filters: 'No specific filters found for this question.',
  not_applicable: 'No related records for this question.',
}

const ChatBubble = ({ message }: { message: ChatMessage }) => (
  <div
    className={cn(
      'flex',
      message.role === 'user' ? 'justify-end' : 'justify-start',
    )}
  >
    <div
      className={cn(
        'max-w-[80%] rounded-md px-4 py-2 text-sm',
        message.error
          ? 'bg-destructive/10 text-destructive border border-destructive/30'
          : message.role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-background border',
      )}
    >
      {message.content}
      {message.link?.status === 'available' ? (
        <a
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'mt-2 h-7 gap-1.5 px-2 text-xs',
          )}
          href={message.link.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon className="h-3 w-3" />
          {message.link.label}
        </a>
      ) : null}
      {message.link && message.link.status !== 'available' ? (
        <p className="text-muted-foreground mt-2 text-xs italic">
          {LINK_PLACEHOLDER_COPY[message.link.status]}
        </p>
      ) : null}
    </div>
  </div>
)
