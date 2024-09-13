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
        id: 'original_256',
        alt: 'Original 256',
        src: getImageSrc(doc, 'original_256'),
      },
      {
        id: 'cropped',
        alt: 'Cropped 256',
        src: getImageSrc(doc, 'cropped_256'),
      },
      {
        id: 'original_full',
        alt: 'Original full',
        src: getImageSrc(doc, 'original_full'),
        thumbnail: getImageSrc(doc, 'original_256'),
      },
      {
        id: 'cropped_full',
        alt: 'Cropped full',
        src: getImageSrc(doc, 'cropped'),
        thumbnail: getImageSrc(doc, 'cropped_256'),
      },
    ]}
  />
)
