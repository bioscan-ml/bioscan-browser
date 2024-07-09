import { getFetchUrl } from '@/lib/getFetchUrl'
import { Doc } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

export const useData = (params: {
  page: number
  pageSize: number
  sort?: Sort
  q?: string
}) => {
  const { isPending, error, data } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
  }>({
    queryKey: ['data', params],
    queryFn: () => fetch(getFetchUrl(params)).then((res) => res.json()),
  })

  return { isPending, error, data: data?.response }
}
