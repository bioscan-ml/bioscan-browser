import { BACKEND_BASE_PATH, REQUEST_TIMEOUT } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

const URL = `${BACKEND_BASE_PATH}/random-id`

export const useRandomSampleId = (seed: number) => {
  const { isPending, error, data } = useQuery<string>({
    queryKey: [URL, { seed }],
    queryFn: async () => {
      const res = await fetch(URL, {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      })
      const data = await res.json()
      const sampleId = data['random_id']

      if (!sampleId) {
        throw Error()
      }

      return sampleId
    },
    retry: false,
  })

  return {
    isPending,
    error,
    data,
  }
}
