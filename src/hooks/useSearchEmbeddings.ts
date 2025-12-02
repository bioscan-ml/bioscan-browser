import { BACKEND_BASE_PATH } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { getFetchUrl } from '@/lib/getFetchUrl'
import { Doc } from '@/types/response-data'
import { SearchType, Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

const INDEX_TYPE = 'PQ64x4fsr'
const URL = `${BACKEND_BASE_PATH}/search-id`

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
    queryKey: [URL, params],
    queryFn: async () => {
      if (!params.queryId) {
        throw Error()
      }

      const searchRes = await fetch(URL, {
        body: JSON.stringify({
          index_type: INDEX_TYPE,
          key_type: params.searchTo,
          num_results: params.pageSize + 1,
          process_id: params.queryId,
          query_type: params.searchFrom,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        signal: AbortSignal.timeout(10000),
      })
      const searchData = await searchRes.json()

      const recordIds: string[] = searchData['matches'] ?? []

      if (!recordIds?.length) {
        throw Error()
      }

      const recordsRes = await fetch(
        getFetchUrl({
          q: filtersToQuery([
            {
              key: 'id',
              values: recordIds.filter(
                (recordId) => recordId !== params.queryId, // Filter out query record
              ),
            },
          ]),
          page: 0,
          pageSize: params.pageSize,
          sort: params.sort,
        }),
      )
      const recordsData = await recordsRes.json()

      const docs = recordsData.response.docs.sort(
        (doc1: Doc, doc2: Doc) =>
          recordIds.indexOf(doc1.id) - recordIds.indexOf(doc2.id),
      )

      return {
        response: {
          ...recordsData.response,
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
