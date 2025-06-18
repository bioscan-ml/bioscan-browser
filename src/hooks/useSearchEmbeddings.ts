import { filtersToQuery } from '@/lib/filtersToQuery'
import { getFetchUrl } from '@/lib/getFetchUrl'
import { makeGradioPrediction } from '@/lib/makeGradioPrediction'
import { Doc } from '@/types/response-data'
import { SearchType, Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

const GRADIO_METHOD = 'searchEmbeddings'
const QUERY_KEY = 'search-embeddings'

export const useSearchEmbeddings = (params: {
  queryId: string | null
  searchFrom: SearchType
  searchTo: SearchType
  pageSize: number
  sort?: Sort
}) => {
  const { data, error, isPending, refetch } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
  }>({
    queryKey: [QUERY_KEY, params],
    queryFn: async () => {
      if (!params.queryId) {
        throw Error()
      }

      // TODO: In practice, this call will never complete. When this issue is resolved, we can start parse the response.
      const predictionRes = await makeGradioPrediction({
        method: GRADIO_METHOD,
        data: [
          params.queryId,
          params.searchFrom,
          params.searchTo,
          params.pageSize + 1,
        ],
      })

      const recordIds: string[] = JSON.parse(
        predictionRes.split('data: ')[1].trim().slice(2, -2).replace(/'/g, '"'),
      )

      if (!recordIds?.length) {
        throw Error()
      }

      // Use sample ids to get records
      const q = filtersToQuery([
        {
          type: 'id',
          value: recordIds.filter((recordId) => recordId !== params.queryId), // Filter out query record
        },
      ])
      const recordsRes = await fetch(
        getFetchUrl({
          q,
          page: 0,
          pageSize: params.pageSize,
          sort: params.sort,
        }),
      )

      const data = await recordsRes.json()

      const docs = data.response.docs.sort(
        (doc1: Doc, doc2: Doc) =>
          recordIds.indexOf(doc1.id) - recordIds.indexOf(doc2.id),
      )

      return {
        response: {
          ...data.response,
          docs,
        },
      }
    },
    enabled: !!params.queryId,
    retry: false,
  })

  return {
    data: data?.response,
    error,
    isPending,
    refetch,
  }
}
