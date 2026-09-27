import { SOLR_BASE_PATH } from '@/lib/apiPaths'
import { REQUEST_TIMEOUT } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'
import { useSampleRecords } from './useSampleRecords'

const QUERY_KEY = 'record'

export const useRecord = ({
  id,
  enabled,
}: {
  id?: string | null
  enabled?: boolean
}) => {
  const { data: fallbackData } = useSampleRecords()
  const { data, error, isPending, refetch } = useQuery<Doc>({
    queryKey: [QUERY_KEY, { id }],
    queryFn: async () => {
      if (!id) {
        throw Error()
      }

      const q = filtersToQuery([{ key: 'id', values: [id] }])
      const res = await fetch(`${SOLR_BASE_PATH}?q=${q}`, {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      })
      const data = await res.json()
      const doc = data.response.docs[0]

      if (!doc) {
        throw Error()
      }

      return doc
    },
    enabled: id ? enabled : false,
    retry: false,
  })

  const doc = error ? fallbackData?.docs.find((doc) => doc.id === id) : data

  return {
    data: doc,
    error: doc ? null : error,
    isPending,
    refetch,
  }
}
