import { Doc } from '@/types/response-data'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const QUERY_KEY = 'sample-records'

export const useSampleRecords = () => {
  const { isPending, error, data } = useQuery<Doc[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const res = await fetch('/sample-records.json')

      return await res.json()
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const randomSampleRecords = useMemo(() => {
    if (!data) {
      return undefined
    }

    return [...data].sort(() => Math.random() - 0.5)
  }, [data])

  return {
    isPending,
    error,
    sampleRecords: randomSampleRecords,
  }
}
