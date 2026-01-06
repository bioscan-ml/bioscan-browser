import { BACKEND_BASE_PATH } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { getFetchUrl } from '@/lib/getFetchUrl'
import { Doc } from '@/types/response-data'
import { SearchType, Sort } from '@/types/settings'
import { useQuery } from '@tanstack/react-query'

const INDEX_TYPE = 'PQ64x4fsr'
const SEARCH_ID_URL = `${BACKEND_BASE_PATH}/search-id`
const SEARCH_IMAGE_URL = `${BACKEND_BASE_PATH}/search-image`
const QUERY_KEY = 'find-similar'

interface Params {
  id: string | null
  image: File | null
  pageSize: number
  searchFrom: SearchType
  searchTo: SearchType
  sort?: Sort
}

const search = async (params: Params) => {
  if (params.id) {
    return await fetch(SEARCH_ID_URL, {
      body: JSON.stringify({
        index_type: INDEX_TYPE,
        key_type: params.searchTo,
        num_results: params.pageSize + 1,
        process_id: params.id,
        query_type: params.searchFrom,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      signal: AbortSignal.timeout(10000),
    })
  }

  if (params.image) {
    const data = new FormData()
    data.append('images', params.image)
    data.append('index_type', INDEX_TYPE)
    data.append('key_type', params.searchTo)
    data.append('num_results', `${params.pageSize + 1}`)
    data.append('crop_type', 'True')

    return await fetch(SEARCH_IMAGE_URL, {
      body: data,
      method: 'POST',
      signal: AbortSignal.timeout(10000),
    })
  }

  throw Error()
}

export const useFindSimilar = (params: Params) => {
  const { data, error, isLoading, refetch } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
  }>({
    queryKey: [QUERY_KEY, params, params.image?.name],
    queryFn: async () => {
      if (!params.id && !params.image) {
        throw Error()
      }

      const searchRes = await search(params)
      const searchData = await searchRes.json()
      const recordIds: string[] =
        searchData['matches'] ?? searchData['results'][0]['matches'] ?? []

      if (!recordIds?.length) {
        throw Error()
      }

      const recordsRes = await fetch(
        getFetchUrl({
          q: filtersToQuery([
            {
              key: 'id',
              values: recordIds.filter(
                (recordId) => recordId !== params.id, // Filter out current record
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
    enabled: !!(params.id || params.image),
    retry: false,
  })

  return {
    data: data?.response,
    error,
    isLoading,
    refetch,
  }
}
