import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Doc } from '@/types/response-data'
import { DownloadIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import colors from 'tailwindcss/colors'

const COLOR_MAP: { [key: string]: string } = {
  A: '#FF6666', // red
  T: '#6666FF', // blue
  C: '#66CC66', // green
  G: '#CCCC66', // yellow
  N: colors.gray[200],
}

const STROKE_WIDTH = 1

interface DnaBarcodeProps {
  doc: Doc
  height?: number
  showDownloadLink?: boolean
}

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

    if (canvas) {
      const context = canvas?.getContext('2d')

      if (context) {
        // Clear canvas
        context.clearRect(0, 0, width, height)

        // Draw on canvas
        nucleotides.forEach((nucleotide, index) => {
          context.fillStyle = COLOR_MAP[nucleotide]
          context.fillRect(index * STROKE_WIDTH, 0, STROKE_WIDTH, height)
        })
      }

      // Update PNG download data
      setDataURL(canvas.toDataURL())
    }
  }, [height, nucleotides, width])

  return (
    <>
      <canvas
        className="hidden"
        ref={canvasRef}
        width={width}
        height={height}
      />
      <div className="space-y-2">
        <img style={{ height: `${height}px` }} src={dataURL} />
        {showDownloadLink ? (
          <a
            className={cn(
              'sticky left-0',
              buttonVariants({ variant: 'outline', size: 'sm' }),
            )}
            download={`barcode-${doc.id}.png`}
            href={dataURL}
          >
            Download PNG
            <DownloadIcon className="w-4 h-4 ml-2" />
          </a>
        ) : null}
      </div>
    </>
  )
}
