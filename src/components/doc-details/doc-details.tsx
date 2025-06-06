import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { ChevronRight } from 'lucide-react'
import { BookmarkControl } from '../bookmark-control'
import { CodeBlock } from '../code-block'
import { FindSimilarControl } from '../find-similar-control'
import { Map } from '../map'
import { TaxonDetailsArticle } from '../taxon-details-article'
import { Dna } from './dna'
import { Fields } from './fields'
import { Images } from './images'
import { ReportInfo } from './report-info'

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
    {doc && <DocDetailsDialogContent doc={doc} />}
  </Dialog>
)

export const DocDetailsDialogContent = ({ doc }: { doc: Doc }) => {
  const { taxon, parents } = getTaxon(doc)

  return (
    <DialogContent className="h-full max-w-screen-md flex flex-col gap-8 overflow-auto sm:h-[calc(100%-4rem)]">
      <DialogHeader>
        <div className="flex items-center gap-4">
          <DialogTitle>{taxon.label}</DialogTitle>
          <Badge variant="outline" className="uppercase">
            {taxon.rankLabel}
          </Badge>
          <BookmarkControl doc={doc} />
        </div>
        <DialogDescription className="mb-4">
          {parents.map((parent, index) => (
            <span key={index} className="inline-flex items-center">
              {parent.label}
              {index < parents.length - 1 && (
                <ChevronRight className="w-3 h-3 mx-1 opacity-50 inline" />
              )}
            </span>
          ))}
        </DialogDescription>
        <div className="flex items-center gap-4">
          <FindSimilarControl doc={doc} size="sm" variant="outline" />
        </div>
      </DialogHeader>
      <Fields doc={doc} />
      <Tabs defaultValue="images">
        <TabsList>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="dna">DNA</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
          <TabsTrigger value="learn-more">Learn more</TabsTrigger>
        </TabsList>
        <TabsContent value="images">
          <Images doc={doc} />
        </TabsContent>
        <TabsContent value="dna">
          <Dna doc={doc} />
        </TabsContent>
        <TabsContent value="map">
          <DocDetailsMap doc={doc} />
        </TabsContent>
        <TabsContent value="raw">
          <CodeBlock copyable code={JSON.stringify(doc, null, 4)} />
        </TabsContent>
        <TabsContent value="learn-more">
          <div className="my-8">
            <TaxonDetailsArticle taxon={taxon} />
          </div>
        </TabsContent>
      </Tabs>
      <ReportInfo doc={doc} />
    </DialogContent>
  )
}

const DocDetailsMap = ({ doc }: { doc: Doc }) => {
  if (!doc.latlon) {
    return (
      <div className="text-center space-y-8 p-16">
        <div>
          <p className="text-xl font-medium mb-2">Map is not available</p>
          <p className="text-sm text-muted-foreground">
            The current record is missing information for latitude and
            longitude.
          </p>
        </div>
      </div>
    )
  }

  const [latitude, longitude] = doc.latlon
    .split(',')
    .map((value) => Number(value))

  const locationLabel = doc.province_state
    ? `${doc.province_state}, ${doc.country}`
    : doc.country

  return (
    <Map
      marker={{ latitude, longitude }}
      popupContent={`${locationLabel}<br />(${latitude}, ${longitude})`}
    />
  )
}
