import { cn } from '@/lib/utils'
import { Doc } from '@/types/response-data'
import { DownloadIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import colors from 'tailwindcss/colors'
import { buttonVariants } from '../ui/button'

interface DnaBarcodeProps {
  doc: Doc
  height?: number
  showDownloadLink?: boolean
}

const COLOR_MAP: { [key: string]: string } = {
  A: '#FF6666', // red
  T: '#6666FF', // blue
  C: '#66CC66', // green
  G: '#CCCC66', // yellow
  N: colors.gray[200],
}

const STROKE_WIDTH = 1

export const DnaBarcode = ({
  doc,
  height = 64,
  showDownloadLink,
}: DnaBarcodeProps) => {
  const [dataURL, setDataURL] = useState<string>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nucleotides = useMemo(
    () => doc.dna_barcode.split(''),
    [doc.dna_barcode],
  )
  const width = nucleotides.length * STROKE_WIDTH

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (context) {
      context.clearRect(0, 0, width, height)

      nucleotides.forEach((nucleotide, index) => {
        context.fillStyle = COLOR_MAP[nucleotide]
        context.fillRect(index * STROKE_WIDTH, 0, STROKE_WIDTH, height)
      })
    }

    if (canvas) {
      setDataURL(canvas.toDataURL())
    }
  }, [height, nucleotides, width])

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        width={nucleotides.length * STROKE_WIDTH}
        height={height}
      />
      {showDownloadLink ? (
        <a
          className={cn(
            'sticky left-0',
            buttonVariants({ variant: 'outline', size: 'sm' }),
          )}
          download={`barcode-${doc.id}.png`}
          href={dataURL}
        >
          Download
          <DownloadIcon className="w-4 h-4 ml-2" />
        </a>
      ) : null}
    </div>
  )
}
