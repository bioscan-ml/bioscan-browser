import { Doc } from '@/types/response-data'

export const getTaxonomy = (doc: Doc) => {
  const ranks = [
    doc.phylum,
    doc.class,
    doc.order,
    doc.family,
    doc.subfamily,
    doc.genus,
    doc.species,
  ].filter((rank) => !!rank)

  const [determinationLabel] = ranks.splice(-1)

  return { determinationLabel, ranks }
}
