import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { ChevronRight } from 'lucide-react'
import { To } from 'react-router-dom'
import { CodeBlock } from '../code-block'
import { Map } from '../map'
import { TaxonDetailsArticle } from '../taxon-details-article'
import { Badge } from '../ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Fields } from './fields'
import { Images } from './images'

interface DocDetailsProps {
  doc?: Doc
  open: boolean
  getFieldLink?: (key: string, value: string) => To | undefined
  onOpenChange: (open: boolean) => void
}

export const DocDetails = ({
  doc,
  open,
  getFieldLink,
  onOpenChange,
}: DocDetailsProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    {doc && <DocDetailsContent doc={doc} getFieldLink={getFieldLink} />}
  </Dialog>
)

const DocDetailsContent = ({
  doc,
  getFieldLink,
}: { doc: Doc } & Pick<DocDetailsProps, 'getFieldLink'>) => {
  const { taxon, parents } = getTaxon(doc)
  const [latitude, longitude] = doc.latlon
    .split(',')
    .map((value) => Number(value))

  return (
    <DialogContent className="h-full max-w-screen-sm flex flex-col gap-8 overflow-auto sm:h-[calc(100%-4rem)]">
      <DialogHeader>
        <div className="flex gap-4">
          <DialogTitle>{taxon.label}</DialogTitle>
          <Badge variant="outline" className="uppercase">
            {taxon.rankLabel}
          </Badge>
        </div>
        <DialogDescription>
          {parents.map((parent, index) => (
            <span key={index} className="inline-flex items-center">
              {parent.label}
              {index < parents.length - 1 && (
                <ChevronRight className="w-3 h-3 mx-1 opacity-50 inline" />
              )}
            </span>
          ))}
        </DialogDescription>
      </DialogHeader>
      <Fields doc={doc} getFieldLink={getFieldLink} />
      <Tabs defaultValue="images">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
          <TabsTrigger value="learn-more">Learn more</TabsTrigger>
        </TabsList>
        <TabsContent value="images">
          <Images doc={doc} />
        </TabsContent>
        <TabsContent value="map">
          <Map
            marker={{ latitude, longitude }}
            popupContent={`${doc.province_state}, ${doc.country}<br />(${latitude}, ${longitude})`}
          />
        </TabsContent>
        <TabsContent value="raw">
          <CodeBlock code={JSON.stringify(doc, null, 4)} />
        </TabsContent>
        <TabsContent value="learn-more">
          <div className="my-8">
            <TaxonDetailsArticle taxon={taxon} />
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  )
}
