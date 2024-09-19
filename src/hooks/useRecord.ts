import { SOLR_BASE_PATH } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'record'

export const useRecord = (id: string) => {
  const { isPending, error, data } = useQuery<{
    response: {
      docs: Doc[]
    }
  }>({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const q = filtersToQuery([{ type: 'id', value: [id] }])
      const res = await fetch(`${SOLR_BASE_PATH}?q=${q}`)

      return await res.json()
    },
  })

  return {
    isPending,
    error,
    data: data?.response.docs.length ? data.response.docs[0] : undefined,
  }
}
