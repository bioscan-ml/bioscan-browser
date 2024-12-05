import { filtersToQuery } from '@/lib/filtersToQuery'
import { getFetchUrl } from '@/lib/getFetchUrl'
import { Doc } from '@/types/response-data'
import { SearchType, Sort } from '@/types/settings'
import { Client } from '@gradio/client'
import { useQuery } from '@tanstack/react-query'

const GRADIO_APP_REF = 'bioscan-ml/browser-backend'
const GRADIO_ENDPOINT = '/searchEmbeddings'
const QUERY_KEY = 'search-embeddings'

export const useSearchEmbeddings = (params: {
  sampleId: string | null
  searchFrom: SearchType
  searchTo: SearchType
  pageSize: number
  sort?: Sort
}) => {
  const { isPending, error, data } = useQuery<{
    response: {
      docs: Doc[]
      numFound: number
      start: number
    }
  }>({
    queryKey: [QUERY_KEY, params],
    queryFn: async () => {
      if (!params.sampleId) {
        throw Error()
      }

      const client = await Client.connect(GRADIO_APP_REF)
      const result = await client.predict(GRADIO_ENDPOINT, {
        id: params.sampleId,
        key_type: params.searchFrom,
        query_type: params.searchTo,
        num_results: params.pageSize,
      })

      const sampleIds: string[] = JSON.parse(
        (result.data as string[])[0].replace(/'/g, '"'),
      )

      if (!sampleIds?.length) {
        throw Error()
      }

      // Use sample ids to get records
      const q = filtersToQuery([
        {
          type: 'sampleid',
          value: sampleIds,
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
          sampleIds.indexOf(doc1.sampleid) - sampleIds.indexOf(doc2.sampleid),
      )

      return {
        response: {
          ...data.response,
          docs,
        },
      }
    },
    retry: false,
  })

  return {
    isPending,
    error,
    data: data?.response,
  }
}
