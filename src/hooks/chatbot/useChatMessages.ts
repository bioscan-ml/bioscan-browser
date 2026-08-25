import { getSearchPathFromFilters } from '@/lib/getSearchPathFromFilters'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatMessage, useSendMessage } from './useSendMessage'

const STORAGE_KEY = 'chatbot-messages'

const getStoredMessages = (): ChatMessage[] => {
  const value = sessionStorage.getItem(STORAGE_KEY)

  try {
    return value ? JSON.parse(value) : []
  } catch {
    sessionStorage.removeItem(STORAGE_KEY)
    return []
  }
}

// Shared chat state (messages + input), backed by sessionStorage so the
// dedicated /chatbot page and the floating widget can pick up the same
// conversation. Only one of them is ever mounted at a time.
export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(getStoredMessages)
  const [input, setInput] = useState('')
  const { sendMessage, isPending } = useSendMessage()
  const navigate = useNavigate()

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const submit = async () => {
    const trimmed = input.trim()

    if (!trimmed || isPending) {
      return
    }

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')

    try {
      const { reply, bioscanAction } = await sendMessage(trimmed)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, bioscanAction },
      ])

      // The answer is always shown in the chat regardless of bioscanAction --
      // auto_navigate additionally jumps to Search with the filters applied.
      if (bioscanAction?.type === 'auto_navigate') {
        navigate(getSearchPathFromFilters(bioscanAction.filters))
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Could not get a response, please try again.',
          error: true,
        },
      ])
    }
  }

  return { messages, input, setInput, submit, isPending }
}
