import { SOLR_BASE_PATH } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'record'

export const useRecord = ({
  id,
  enabled,
}: {
  id?: string | null
  enabled?: boolean
}) => {
  const { data, error, isPending, refetch } = useQuery<Doc>({
    queryKey: [QUERY_KEY, { id }],
    queryFn: async () => {
      if (!id) {
        throw Error()
      }

      const q = filtersToQuery([{ type: 'id', value: [id] }])
      const res = await fetch(`${SOLR_BASE_PATH}?q=${q}`)
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

  return {
    data,
    error,
    isPending,
    refetch,
  }
}
