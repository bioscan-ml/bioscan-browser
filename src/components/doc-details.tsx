import { getTaxonomy } from '@/lib/getTaxonomy'
import { FIELDS } from '@/pages/asset-querier/fields'
import { Doc } from '@/types/response-data'
import { ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface DocDetailsProps {
  doc?: Doc
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DocDetails = ({ doc, open, onOpenChange }: DocDetailsProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    {doc && <DocDetailsContent doc={doc} />}
  </Dialog>
)

const DocDetailsContent = ({ doc }: { doc: Doc }) => {
  const { determinationLabel, ranks } = getTaxonomy(doc)

  return (
    <DialogContent className="max-h-full box-border flex flex-col gap-8 overflow-auto">
      <DialogHeader>
        <DialogTitle>{determinationLabel}</DialogTitle>
        <DialogDescription>
          {ranks.map((rank, index) => (
            <span key={index} className="inline-flex items-center">
              {rank}
              {index < ranks.length - 1 && (
                <ChevronRight className="w-3 h-3 mx-1 opacity-50 inline" />
              )}
            </span>
          ))}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 grid-cols-2">
        {FIELDS.filter((field) => !!doc[field.key]).map((field) => (
          <div key={field.key} className="text-sm">
            <span className="font-medium text-muted-foreground block">
              {field.label}
            </span>
            <span className="block">{doc[field.key] ?? 'n/a'}</span>
          </div>
        ))}
      </div>

      <Tabs defaultValue="images">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
        </TabsList>
        <TabsContent value="images"></TabsContent>
        <TabsContent value="map"></TabsContent>
        <TabsContent value="raw"></TabsContent>
      </Tabs>
    </DialogContent>
  )
}
