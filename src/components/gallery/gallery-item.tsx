import { getImageSrc } from '@/lib/getImageSrc'
import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { ChevronRightIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface GalleryItemProps {
  children?: ReactNode
  doc: Doc
  onClick: () => void
}

export const GalleryItem = ({ children, doc, onClick }: GalleryItemProps) => {
  const { taxon, parents } = getTaxon(doc)

  return (
    <div className="rounded-md border border-input bg-card overflow-hidden relative">
      <div className="h-full cursor-pointer hover:bg-muted" onClick={onClick}>
        <img
          alt={doc.id}
          className="w-full aspect-[341/256]"
          loading="lazy"
          src={getImageSrc(doc)}
        />
        <div className="p-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">{taxon.label}</div>
            <div className="text-xs">
              {parents.map((parent, index) => (
                <span key={index} className="inline-flex items-center">
                  {parent.label}
                  {index < parents.length - 1 && (
                    <ChevronRightIcon className="w-3 h-3 mx-1 opacity-50 inline" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
