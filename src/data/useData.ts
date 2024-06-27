import { getFetchUrl } from '@/lib/getFetchUrl'
import { useQuery } from '@tanstack/react-query'

interface ResponseData {
  response: {
    docs: { id: string }[]
  }
}

export const useData = () => {
  const { isPending, error, data } = useQuery<ResponseData>({
    queryKey: ['data'],
    queryFn: () => fetch(getFetchUrl({ rows: 20 })).then((res) => res.json()),
  })

  return { isPending, error, data: data?.response }
}
