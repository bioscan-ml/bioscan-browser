import { DialogDescription } from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { InfoIcon } from 'lucide-react'
import { TaxonDetailsArticle } from './taxon-details-article'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

interface TaxonDetailsProps {
  taxon: {
    label: string
    rankLevel: string
  }
}

export const TaxonDetails = ({ taxon }: TaxonDetailsProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="icon">
        <InfoIcon className="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="h-full max-w-screen-sm flex flex-col gap-8 overflow-auto sm:h-[calc(100%-4rem)]">
      <VisuallyHidden.Root>
        <DialogTitle>{taxon.label}</DialogTitle>
        <DialogDescription />
      </VisuallyHidden.Root>
      <TaxonDetailsArticle taxon={taxon} />
    </DialogContent>
  </Dialog>
)
