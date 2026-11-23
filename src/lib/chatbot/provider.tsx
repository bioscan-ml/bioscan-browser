import { useChatMessages } from '@/hooks/chatbot/useChatMessages'
import { ReactNode } from 'react'
import { ChatContext } from './context'

// Owns the single chat conversation for the whole app. The floating widget
// and the /chatbot page both read from here, so they always show the same
// messages, and a reply that arrives after navigating between them still
// lands in the visible conversation.
export const ChatContextProvider = ({ children }: { children: ReactNode }) => (
  <ChatContext.Provider value={useChatMessages()}>
    {children}
  </ChatContext.Provider>
)
