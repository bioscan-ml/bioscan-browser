import { getImageSrc } from '@/lib/getImageSrc'
import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { MapPinIcon } from 'lucide-react'
import { DnaBarcode } from '../dna-barcode/dna-barcode'

interface MultiModalGalleryItemProps {
  doc: Doc
  onClick: () => void
}

export const MultiModalGalleryItem = ({
  doc,
  onClick,
}: MultiModalGalleryItemProps) => {
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
        <div className="p-2 space-y-2 overflow-hidden">
          <div>
            <DnaBarcode height={32} doc={doc} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium whitespace-nowrap">
              {taxon.label}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground overflow-hidden">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-xs whitespace-nowrap truncate">
                {doc.province_state
                  ? `${doc.province_state}, ${doc.country}`
                  : `${doc.country}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
