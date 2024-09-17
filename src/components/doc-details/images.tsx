import { getImageSrc } from '@/lib/getImageSrc'
import { Doc } from '@/types/response-data'
import { ImagePicker } from '../image-picker'

interface ImagesProps {
  doc: Doc
}

export const Images = ({ doc }: ImagesProps) => (
  <ImagePicker
    images={[
      {
        badge: 'Original 256',
        id: 'original_256',
        src: getImageSrc(doc, 'original_256'),
        tooltip: 'Original 256',
      },
      {
        badge: 'Cropped 256',
        id: 'cropped',
        src: getImageSrc(doc, 'cropped_256'),
        tooltip: 'Cropped 256',
      },
      {
        badge: 'Original full',
        id: 'original_full',
        src: getImageSrc(doc, 'original_full'),
        thumbnail: getImageSrc(doc, 'original_256'),
        tooltip: 'Original full',
      },
      {
        badge: 'Cropped full',
        id: 'cropped_full',
        src: getImageSrc(doc, 'cropped'),
        thumbnail: getImageSrc(doc, 'cropped_256'),
        tooltip: 'Cropped full',
      },
    ]}
  />
)
