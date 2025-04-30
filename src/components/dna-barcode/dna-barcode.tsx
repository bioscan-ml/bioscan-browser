import { Doc } from '@/types/response-data'
import colors from 'tailwindcss/colors'

interface DnaBarcodeProps {
  doc: Doc
  height?: number
}

const COLOR_MAP: { [key: string]: string } = {
  A: colors.blue[500],
  T: colors.green[500],
  C: colors.red[500],
  G: colors.yellow[500],
}

export const DnaBarcode = ({ doc, height = 128 }: DnaBarcodeProps) => {
  const nucleotides = doc.dna_barcode.split('')

  return (
    <div className="flex">
      {nucleotides.map((nucleotide, index) => (
        <div
          key={index}
          style={{
            backgroundColor: COLOR_MAP[nucleotide],
            height: `${height}px`,
            width: `1px`,
          }}
        />
      ))}
    </div>
  )
}
