import { PageContent } from '@/components/page-content'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { ChatMessage, useSendMessage } from '@/hooks/chatbot/useSendMessage'
import { cn } from '@/lib/cn'
import { Loader2Icon, SendIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'

export const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const { sendMessage, isPending, error } = useSendMessage()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const trimmed = input.trim()

    if (!trimmed || isPending) {
      return
    }

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')

    try {
      const { reply } = await sendMessage(trimmed)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      // 出错时下面的 error 提示已经会显示，这里不用额外处理
    }
  }

  return (
    <PageContent>
      <div className="py-6 space-y-6 md:py-12">
        <div>
          <h1 className="text-accent mb-2">Chatbot</h1>
          <p className="text-muted-foreground">
            Ask questions about BIOSCAN-5M.
          </p>
        </div>
        <div className="rounded-sm border bg-muted">
          <ScrollArea className="h-[70vh] p-6">
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
            className="flex items-end gap-2 border-t p-4"
            onSubmit={onSubmit}
          >
            <Textarea
              className="min-h-10 resize-none"
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Type a message..."
              value={input}
            />
            <Button
              disabled={isPending || !input.trim()}
              size="icon"
              type="submit"
            >
              <SendIcon className="w-4 h-4" />
            </Button>
          </form>
          {error ? (
            <p className="text-destructive text-xs italic px-4 pb-4">
              Could not get a response, please try again.
            </p>
          ) : null}
        </div>
      </div>
    </PageContent>
  )
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
        message.role === 'user'
          ? 'bg-primary text-primary-foreground'
          : 'bg-background border',
      )}
    >
      {message.content}
    </div>
  </div>
)
