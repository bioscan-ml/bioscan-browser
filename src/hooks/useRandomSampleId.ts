import { useQuery } from '@tanstack/react-query'

const URL = 'backend/random-id'

export const useRandomSampleId = (seed: number) => {
  const { isPending, error, data } = useQuery<string>({
    queryKey: [URL, { seed }],
    queryFn: async () => {
      const res = await fetch(URL)
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
