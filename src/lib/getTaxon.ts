import { Doc } from '@/types/response-data'
import { TAXON_FILTER_TYPES } from './constants'

export const getTaxon = (doc: Doc) => {
  const taxa = TAXON_FILTER_TYPES.map(({ key, label }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: string = (doc as any)[key]

    return { rankLevel: key, rankLabel: label, label: value }
  }).filter((rank) => !!rank.label)

  const [taxon] = taxa.splice(-1)

  return { taxon, parents: taxa }
}
