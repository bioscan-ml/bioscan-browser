import { getFetchUrl } from '@/lib/getFetchUrl'
import { ResponseData } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

export const useData = (params: {
  page: number
  pageSize: number
  sort: Sort
}) => {
  const { isPending, error, data } = useQuery<ResponseData>({
    queryKey: ['data', params],
    queryFn: () => fetch(getFetchUrl(params)).then((res) => res.json()),
  })

  return { isPending, error, data: data?.response }
}
