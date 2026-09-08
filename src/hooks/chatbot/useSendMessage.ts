import { BACKEND_BASE_PATH } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
  link?: ChatLink
}

// Optional "view these records" link from BioChat, independent of the
// answer text. Only count/list/top/aggregate/distribution questions that
// resolved to concrete filters get a real, clickable link ("available");
// everything else carries a fixed status so the UI can show a placeholder
// instead of guessing from the answer text. `url` is a ready-to-use Search
// page path (already built server-side), so the frontend never needs to
// know the underlying filter keys.
export type ChatLink =
  | { status: 'available'; label: string; url: string }
  | { status: 'no_filters' | 'not_applicable' }

type ChatCompletionResponse = {
  choices?: { message?: { content?: string } }[]
  link?: ChatLink
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

      return { reply, link: data.link }
    },
  })

  return { sendMessage: mutateAsync, isPending }
}
