import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PATHS } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { InfoIcon } from 'lucide-react'
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
        <div className="sticky left-0 flex items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Barcode Index Number (BIN)
          </span>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent side="bottom">
                  <div className="max-w-72">
                    <p>
                      This BIN ensures that genetically identical taxa share the
                      same identifier, registered in the Barcode Of Life Data
                      system (BOLD).
                    </p>
                  </div>
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        </div>

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
      <div className="flex flex-col items-start text-sm overflow-auto">
        <div className="sticky left-0 flex items-center gap-2">
          <span className="font-medium text-muted-foreground">Barcode</span>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent side="bottom">
                  <div className="max-w-72">
                    <p className="mb-1">
                      This visual representation offers a glimpse into the
                      intricate structure of DNA. The color scheme is designed
                      as follows:
                    </p>
                    <ul>
                      <li>Adenine (A): Red</li>
                      <li>Thymine (T): Blue</li>
                      <li>Cytosine (C): Green</li>
                      <li>Guanine (G): Yellow</li>
                    </ul>
                  </div>
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        </div>
        <DnaBarcode doc={doc} height={128} showDownloadLink />
      </div>
      <div className="flex flex-col items-start text-sm">
        <span className="font-medium text-muted-foreground">Sequence</span>
        <span className="break-all">{nucleotides}</span>
      </div>
    </div>
  )
}
