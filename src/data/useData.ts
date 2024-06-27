import { getFetchUrl } from '@/lib/getFetchUrl'
import { useQuery } from '@tanstack/react-query'

interface ResponseData {
  response: {
    docs: {
      class: string
      country: string
      family: string
      genus: string
      id: string
      order: string
      phylum: string
      province_state: string
      subfamily: string
      species: string
      timestamp: string
      updated: string
    }[]
    numFound: number
    start: number
  }
}

export const useData = (params: { page: number }) => {
  const { isPending, error, data } = useQuery<ResponseData>({
    queryKey: ['data', params],
    queryFn: () =>
      fetch(getFetchUrl({ rows: 100, start: 100 * params.page })).then((res) =>
        res.json(),
      ),
  })

  return { isPending, error, data: data?.response }
}
