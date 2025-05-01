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
      className="p-4 grid gap-2 border-b border-border cursor-pointer hover:bg-muted"
      onClick={onClick}
    >
      <div className="w-full overflow-hidden">
        <DnaBarcode doc={doc} />
      </div>
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
  )
}
