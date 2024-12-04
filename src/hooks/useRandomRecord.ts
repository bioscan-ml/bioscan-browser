import { SOLR_BASE_PATH } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'record'

export const useRandomRecord = (seed: number) => {
  const { isPending, error, data } = useQuery<{
    response: {
      docs: Doc[]
    }
  }>({
    queryKey: [QUERY_KEY, { seed }],
    queryFn: async () => {
      let fetchUrl = `${SOLR_BASE_PATH}?q=*:*&`
      if (seed) {
        fetchUrl += `&sort=random_${seed} asc`
      }
      const res = await fetch(fetchUrl)

      return await res.json()
    },
  })

  return {
    isPending,
    error,
    data: data?.response.docs.length ? data.response.docs[0] : undefined,
  }
}
