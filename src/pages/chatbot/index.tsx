import { ChatPanel } from '@/components/chatbot/chat-panel'
import { PageContent } from '@/components/page-content'
import { useChatMessages } from '@/hooks/chatbot/useChatMessages'

export const Chatbot = () => {
  const { messages, input, setInput, submit, isPending } = useChatMessages()

  return (
    <PageContent>
      <div className="py-6 space-y-6 md:py-12">
        <div>
          <h1 className="text-accent mb-2">Chatbot</h1>
          <p className="text-muted-foreground">
            Ask questions about BIOSCAN-5M.
          </p>
        </div>
        <div className="flex h-[70vh] flex-col rounded-sm border bg-muted">
          <ChatPanel
            input={input}
            isPending={isPending}
            messages={messages}
            onInputChange={setInput}
            onSubmit={submit}
          />
        </div>
      </div>
    </PageContent>
  )
}
