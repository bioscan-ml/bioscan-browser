import { getImageSrc } from '@/lib/getImageSrc'
import { getTaxonomy } from '@/lib/getTaxonomy'
import { Doc } from '@/types/response-data'
import { ChevronRightIcon } from 'lucide-react'

interface GalleryProps {
  docs?: Doc[]
  onItemClick: (doc: Doc) => void
}

export const Gallery = ({ docs = [], onItemClick }: GalleryProps) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {docs.map((doc) => {
      const { determinationLabel, ranks } = getTaxonomy(doc)

      return (
        <div
          key={doc.id}
          className="rounded-md border border-input overflow-hidden cursor-pointer hover:bg-muted/50"
          onClick={() => onItemClick(doc)}
        >
          <img
            alt={doc.id}
            className="w-full aspect-[341/256]"
            loading="lazy"
            src={getImageSrc(doc)}
          />
          <div className="p-3">
            <div className="space-y-1">
              <div className="text-sm font-medium">{determinationLabel}</div>
              <div className="text-xs">
                {ranks.map((rank, index) => (
                  <span key={index} className="inline-flex items-center">
                    {rank}
                    {index < ranks.length - 1 && (
                      <ChevronRightIcon className="w-3 h-3 mx-1 opacity-50 inline" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    })}
  </div>
)
