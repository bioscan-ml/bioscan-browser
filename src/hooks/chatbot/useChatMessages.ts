import { useEffect, useState } from 'react'
import { ChatMessage, useSendMessage } from './useSendMessage'

const STORAGE_KEY = 'chatbot-messages'

const isChatMessage = (value: unknown): value is ChatMessage => {
  const message = value as ChatMessage | null
  return (
    typeof message === 'object' &&
    message !== null &&
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string'
  )
}

// sessionStorage can throw (blocked site data, quota exceeded) and its
// contents can be anything, so both reads and writes fail soft: the chat
// keeps working in memory, it just won't survive a reload.
const getStoredMessages = (): ChatMessage[] => {
  try {
    const parsed: unknown = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) ?? '[]',
    )
    return Array.isArray(parsed) ? parsed.filter(isChatMessage) : []
  } catch {
    return []
  }
}

const storeMessages = (messages: ChatMessage[]) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch {
    // Ignore: persistence is best-effort.
  }
}

const isTimeoutError = (error: unknown) =>
  error instanceof DOMException && error.name === 'TimeoutError'

// Chat state (messages + input), persisted to sessionStorage so it survives
// reloads. Use it through ChatContextProvider / useChat rather than calling
// it directly, so the floating widget and the /chatbot page share one
// conversation.
export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(getStoredMessages)
  const [input, setInput] = useState('')
  const { sendMessage, isPending } = useSendMessage()

  useEffect(() => {
    storeMessages(messages)
  }, [messages])

  const submit = async () => {
    const trimmed = input.trim()

    if (!trimmed || isPending) {
      return
    }

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')

    try {
      const { reply, link } = await sendMessage(trimmed)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, link },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isTimeoutError(error)
            ? 'BioChat took too long to respond, please try again.'
            : 'Could not get a response, please try again.',
          error: true,
        },
      ])
    }
  }

  return { messages, input, setInput, submit, isPending }
}
