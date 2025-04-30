import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { ChevronRightIcon } from 'lucide-react'
import { DnaBarcode } from '../dna-barcode/dna-barcode'

interface GalleryItemProps {
  doc: Doc
  onClick: () => void
}

export const DnaGalleryItem = ({ doc, onClick }: GalleryItemProps) => {
  const { taxon, parents } = getTaxon(doc)

  return (
    <div
      className="w-min rounded-md border border-input bg-card overflow-hidden cursor-pointer hover:bg-muted"
      onClick={onClick}
    >
      <DnaBarcode doc={doc} height={64} />
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
  )
}
