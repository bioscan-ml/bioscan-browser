import { Client } from '@gradio/client'
import { useQuery } from '@tanstack/react-query'

const GRADIO_APP_REF = 'bioscan-ml/browser-backend'
const GRADIO_ENDPOINT = '/getRandID'
const QUERY_KEY = 'random-id'

export const useRandomSampleId = (seed: number) => {
  const { isPending, error, data } = useQuery<string>({
    queryKey: [QUERY_KEY, { seed }],
    queryFn: async () => {
      const client = await Client.connect(GRADIO_APP_REF)
      const result = await client.predict(GRADIO_ENDPOINT, {})
      const sampleId = (result.data as string[])[0]

      return sampleId
    },
  })

  return {
    isPending,
    error,
    data,
  }
}
