import { makeGradioPrediction } from '@/lib/makeGradioPrediction'
import { useQuery } from '@tanstack/react-query'

const GRADIO_METHOD = 'getRandID'
const QUERY_KEY = 'random-id'

export const useRandomSampleId = (seed: number) => {
  const { isPending, error, data } = useQuery<string>({
    queryKey: [QUERY_KEY, { seed }],
    queryFn: async () => {
      const predictionRes = await makeGradioPrediction({
        method: GRADIO_METHOD,
      })
      const responseData: string[] = JSON.parse(
        predictionRes.split('data: ')[1].replace(/'/g, '"'),
      )
      const sampleId = responseData[0]

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
