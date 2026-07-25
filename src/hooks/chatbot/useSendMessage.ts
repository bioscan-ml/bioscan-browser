import { BACKEND_BASE_PATH } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'

export type ChatMessage = {
      role: 'user' | 'assistant'
      content: string
}

export const useSendMessage = () => {
      const { mutateAsync, isPending, error } = useMutation({
            mutationFn: async (message: string) => {
                  const res = await fetch(`${BACKEND_BASE_PATH}/chat`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message }),
                  })

                  if (!res.ok) {
                        throw Error()
                  }

                  return (await res.json()) as { reply: string }
            },
      })

      return { sendMessage: mutateAsync, isPending, error }
}
