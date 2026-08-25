import { BACKEND_BASE_PATH } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
  bioscanAction?: BioscanAction
}

// Navigation hint from BioChat, independent of the answer text: whether the
// Search page should be offered/opened with `filters` applied. `filters` uses
// the same keys as the Search page's filter params (family/order/genus/
// species/country), so it can be passed straight through unchanged.
export type BioscanAction = {
  type: 'none' | 'suggest' | 'auto_navigate'
  filters: Record<string, string>
  result_count?: number
}

type ChatCompletionResponse = {
  choices?: { message?: { content?: string } }[]
  bioscan_action?: BioscanAction
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

      return { reply, bioscanAction: data.bioscan_action }
    },
  })

  return { sendMessage: mutateAsync, isPending }
}
