import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DocDetails } from './doc-details'

export const DocDetailsDialog = ({
  doc,
  open,
  onOpenChange,
}: {
  doc?: Doc
  open: boolean
  onOpenChange: (open: boolean) => void
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    {doc ? <DocDetailsDialogContent doc={doc} /> : null}
  </Dialog>
)

const DocDetailsDialogContent = ({ doc }: { doc: Doc }) => {
  const { taxon } = getTaxon(doc)

  return (
    <DialogContent
      aria-describedby={undefined}
      className="h-full max-w-screen-md flex flex-col gap-8 overflow-auto sm:h-[calc(100%-4rem)]"
    >
      <VisuallyHidden>
        <DialogTitle>{taxon.label}</DialogTitle>
      </VisuallyHidden>
      <DocDetails doc={doc} />
    </DialogContent>
  )
}
