import { Doc } from '@/types/response-data'
import { TAXON_FILTER_TYPES } from './constants'

export const getTaxonomy = (doc: Doc) => {
  const ranks = TAXON_FILTER_TYPES.map(({ key, label }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: string = (doc as any)[key]

    return { key, label, value }
  }).filter((rank) => !!rank.value)

  const [currentRank] = ranks.splice(-1)

  return { currentRank, ranks }
}
