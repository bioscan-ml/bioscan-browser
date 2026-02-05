import { getImageSrc } from '@/lib/getImageSrc'
import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { ReactNode } from 'react'

interface GalleryItemProps {
  children?: ReactNode
  compact?: boolean
  doc: Doc
  onClick: () => void
}

export const GalleryItem = ({
  children,
  compact,
  doc,
  onClick,
}: GalleryItemProps) => {
  const { taxon } = getTaxon(doc)

  return (
    <div className="rounded-md border border-input bg-card overflow-hidden relative">
      <div className="h-full cursor-pointer hover:bg-muted" onClick={onClick}>
        <img
          alt={doc.id}
          className="w-full aspect-[341/256]"
          loading="lazy"
          src={getImageSrc(doc)}
        />
        <div className="p-2">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">{doc.id}</div>
            <div className="text-sm font-medium leading-tight">
              {compact || taxon.rankLabel === 'Species'
                ? `${taxon.label}`
                : `${taxon.rankLabel} ${taxon.label}`}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
