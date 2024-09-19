import { SOLR_BASE_PATH } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { readStream } from '@/lib/readStream'
import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const API_URL = 'https://msabia-bioscan-ids.hf.space'

const QUERY_KEY = 'embeddings'

export const useEmbeddings = (id?: string) => {
  const { isPending, error, data } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
  }>({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      if (!id) {
        throw Error()
      }

      // Get event id
      const eventIdRes = await fetch(`${API_URL}/call/searchEmbeddings`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ data: [id] }),
      })
      const eventIdData = await eventIdRes.json()
      const eventId = eventIdData.event_id

      if (!eventId) {
        throw Error()
      }

      // Use event id to get embeddings
      const embeddingsRes = await readStream(
        `${API_URL}/call/searchEmbeddings/${eventId}`,
      )
      const embeddingsIds: string[] = JSON.parse(
        embeddingsRes.split('data: ')[1].trim().slice(2, -2).replace(/'/g, '"'),
      )

      if (!embeddingsIds?.length) {
        throw Error()
      }

      // Use embeddings ids to get records
      const q = filtersToQuery([{ type: 'id', value: embeddingsIds }])
      const recordsRes = await fetch(`${SOLR_BASE_PATH}?q=${q}`)
      return await recordsRes.json()
    },
    retry: false,
  })

  return {
    isPending,
    error,
    data: data?.response,
  }
}
