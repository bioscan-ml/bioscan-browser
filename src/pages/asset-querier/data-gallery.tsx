import { TaxonomyHeader } from '@/components/taxonomy-header'
import { getImageSrc } from '@/lib/getImageSrc'
import { Doc } from '@/types/response-data'

interface DataGalleryProps {
  docs?: Doc[]
}

export const DataGallery = ({ docs = [] }: DataGalleryProps) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {docs.map((doc) => (
      <div
        key={doc.id}
        className="rounded-md border border-input overflow-hidden"
      >
        <img
          alt={doc.id}
          className="w-full aspect-[341/256]"
          loading="lazy"
          src={getImageSrc(doc)}
        />
        <div className="p-3">
          <TaxonomyHeader doc={doc} />
        </div>
      </div>
    ))}
  </div>
)
