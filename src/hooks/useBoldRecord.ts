import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const BOLD_API_URL = 'https://portal.boldsystems.org/api'
const QUERY_KEY = 'bold-record'

export const useBoldRecord = ({
  id,
  enabled,
}: {
  id?: string | null
  enabled?: boolean
}) => {
  const { data, error, isPending, refetch } = useQuery<Doc>({
    queryKey: [QUERY_KEY, { id }],
    queryFn: async () => {
      const queryRes = await fetch(
        `${BOLD_API_URL}/query?query=ids:processid:${id}&extent=full`,
      )
      const queryData = await queryRes.json()

      if (!queryData.query_id) {
        throw Error()
      }

      const res = await fetch(`${BOLD_API_URL}/documents/${queryData.query_id}`)
      const data = await res.json()
      const doc = data.data[0]

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
