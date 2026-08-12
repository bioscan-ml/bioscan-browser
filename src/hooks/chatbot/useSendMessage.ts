import { BACKEND_BASE_PATH } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

type ChatCompletionResponse = {
  choices?: { message?: { content?: string } }[]
}

export const useSendMessage = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch(`${BACKEND_BASE_PATH}/v2/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'biochat-hybrid-rag',
          messages: [{ role: 'user', content: message }],
        }),
      })

      if (!res.ok) {
        throw Error()
      }

      const data = (await res.json()) as ChatCompletionResponse
      const reply = data.choices?.[0]?.message?.content

      if (!reply) {
        throw Error()
      }

      return { reply }
    },
  })

  return { sendMessage: mutateAsync, isPending }
}
