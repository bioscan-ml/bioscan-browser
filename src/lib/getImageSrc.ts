import { Doc } from '@/types/response-data'

export const getImageSrc = (doc: Doc) =>
  `https://aspis.cmpt.sfu.ca/stk-bioscan/data/bioscan/bioscan5m/images/original_256/${doc.split}/${doc.chunk ? doc.chunk + '/' : ''}${doc.id}.jpg`
