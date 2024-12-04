import { Doc } from '@/types/response-data'
import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { GalleryItem } from './gallery-item'

interface GalleryProps {
  docs?: Doc[]
  onItemClick: (doc: Doc) => void
  onSearchClick?: (doc: Doc) => void
}

export const Gallery = ({
  docs = [],
  onItemClick,
  onSearchClick,
}: GalleryProps) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {docs.map((doc) => (
      <GalleryItem key={doc.id} doc={doc} onClick={() => onItemClick(doc)}>
        {onSearchClick && (
          <Button
            size="icon"
            variant="outline"
            className="m-2 absolute top-0 right-0"
            onClick={() => onSearchClick(doc)}
          >
            <SearchIcon className="w-4 h-4" />
          </Button>
        )}
      </GalleryItem>
    ))}
  </div>
)
