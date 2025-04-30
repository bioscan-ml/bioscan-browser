import { PATHS } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Link } from 'react-router-dom'
import { DnaBarcode } from '../dna-barcode/dna-barcode'

interface ImagesProps {
  doc: Doc
}

export const Dna = ({ doc }: ImagesProps) => {
  const nucleotides = doc.dna_barcode.split('')

  return (
    <div className="grid gap-4 w-full">
      <div className="flex flex-col items-start text-sm">
        <span className="font-medium text-muted-foreground">DNA BIN</span>
        <Link
          to={{
            pathname: PATHS.SEARCH,
            search: `filter=dna_bin:${doc.dna_bin}`,
          }}
          className="text-link"
        >
          {doc.dna_bin}
        </Link>
      </div>
      <div className="flex flex-col items-start text-sm">
        <span className="font-medium text-muted-foreground">Nucleotides</span>
        <span className="break-all">{nucleotides.length} bp</span>
      </div>
      <div className="flex flex-col items-start text-sm">
        <span className="font-medium text-muted-foreground">Sequence</span>
        <span className="break-all">{nucleotides}</span>
      </div>
      <div className="flex flex-col items-start text-sm">
        <span className="font-medium text-muted-foreground">Barcode</span>
        <DnaBarcode doc={doc} />
      </div>
    </div>
  )
}
