import { Doc } from '@/types/response-data'

export const getImageSrc = (
  doc: Doc,
  type:
    | 'original_full'
    | 'original_256'
    | 'cropped'
    | 'cropped_256' = 'original_256',
) =>
  `https://aspis.cmpt.sfu.ca/stk-bioscan/data/bioscan/bioscan5m/images/${type}/${doc.split}/${doc.chunk ? doc.chunk + '/' : ''}${doc.id}.jpg`
