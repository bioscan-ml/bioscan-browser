import { PATHS } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Link } from 'react-router-dom'
import { DnaBarcode } from '../dna-barcode/dna-barcode'
import { Field } from '../field'

interface ImagesProps {
  doc: Doc
}

export const Dna = ({ doc }: ImagesProps) => {
  const nucleotides = doc.dna_barcode.split('')

  return (
    <div className="grid gap-4 w-full">
      <Field
        label="BIN"
        tooltip="The BIN (Barcode Index Number) ensures that genetically identical taxa share the same identifier, registered in the Barcode Of Life Data system (BOLD)."
      >
        <Link
          to={{
            pathname: PATHS.SEARCH,
            search: `dna_bin=${doc.dna_bin}`,
          }}
          className="text-link"
        >
          {doc.dna_bin}
        </Link>
      </Field>
      <Field label="Nucleotides">
        <span className="break-all">{nucleotides.length} bp</span>
      </Field>
      <Field
        label="Barcode"
        tooltip={`This visual representation offers a glimpse into the intricate structure of DNA. The color scheme is designed as follows:\nAdenine (A): Red\nThymine (T): Blue\nCytosine (C): Green\nGuanine (G): Yellow`}
      >
        <DnaBarcode doc={doc} showDownloadLink />
      </Field>
      <Field label="Sequence">
        <span className="break-all">{nucleotides}</span>
      </Field>
    </div>
  )
}
