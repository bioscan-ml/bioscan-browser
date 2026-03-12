import { Doc } from '@/types/response-data'
import { IMAGES_BASE_PATH } from './constants'

export const getImageSrc = (
  doc: Doc,
  type:
    | 'original_full'
    | 'original_256'
    | 'cropped'
    | 'cropped_256' = 'original_256',
) => {
  const imageBasePath =
    doc.record_type === 'sample' ? '/sample/images' : IMAGES_BASE_PATH

  return `${imageBasePath}/${type}/${doc.split}/${doc.chunk ? doc.chunk + '/' : ''}${doc.id}.jpg`
}
