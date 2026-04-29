import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = 'sample-records'

export const useSampleRecords = () => {
  const { isPending, error, data } = useQuery<Doc[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const res = await fetch('/sample/metadata.json')

      return await res.json()
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  return {
    isPending,
    error,
    data: data
      ? {
          docs: data,
          numFound: data?.length,
          start: 0,
        }
      : undefined,
  }
}
