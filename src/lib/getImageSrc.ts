import { Doc } from '@/types/response-data'
import { IMAGES_BASE_PATH } from './constants'

export const getImageSrc = (
  doc: Doc,
  type:
    | 'original_full'
    | 'original_256'
    | 'cropped'
    | 'cropped_256' = 'original_256',
) =>
  `${IMAGES_BASE_PATH}/${type}/${doc.split}/${doc.chunk ? doc.chunk + '/' : ''}${doc.id}.jpg`
