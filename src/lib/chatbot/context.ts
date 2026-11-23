import { useChatMessages } from '@/hooks/chatbot/useChatMessages'
import { createContext } from 'react'

export type ChatContextValues = ReturnType<typeof useChatMessages>

export const ChatContext = createContext<ChatContextValues | null>(null)
