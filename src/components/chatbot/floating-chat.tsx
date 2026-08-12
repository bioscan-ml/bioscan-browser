import { Button } from '@/components/ui/button'
import { useChatMessages } from '@/hooks/chatbot/useChatMessages'
import { PATHS } from '@/lib/constants'
import { MessageCircleIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatPanel } from './chat-panel'

// Site-wide floating chat bubble. Hidden on the dedicated /chatbot page so
// there's only ever one chat entry point visible at a time; both share the
// same sessionStorage-backed conversation via useChatMessages.
export const FloatingChat = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const { messages, input, setInput, submit, isPending } = useChatMessages()

  if (pathname === PATHS.CHATBOT) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="flex h-[32rem] max-h-[calc(100vh-6rem)] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border bg-muted shadow-xl">
          <div className="flex items-center justify-between border-b bg-background px-4 py-3">
            <span className="text-sm font-medium">Chatbot</span>
            <Button
              aria-label="Close chat"
              className="h-7 w-7"
              onClick={() => setOpen(false)}
              size="icon"
              variant="ghost"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <ChatPanel
            input={input}
            isPending={isPending}
            messages={messages}
            onInputChange={setInput}
            onSubmit={submit}
          />
        </div>
      ) : null}
      <Button
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={() => setOpen((prev) => !prev)}
        size="icon"
      >
        {open ? (
          <XIcon className="h-5 w-5" />
        ) : (
          <MessageCircleIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}
