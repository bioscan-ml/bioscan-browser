import { getImageSrc } from '@/lib/getImageSrc'
import { getTaxonomy } from '@/lib/getTaxonomy'
import { FIELDS } from '@/pages/asset-querier/fields'
import { Doc } from '@/types/response-data'
import { ChevronRight } from 'lucide-react'
import { CodeBlock } from './code-block'
import { ImagePicker } from './image-picker'
import { Map } from './map'
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
  const [latitude, longitude] = doc.latlon
    .split(',')
    .map((value) => Number(value))

  return (
    <DialogContent className="h-full max-w-screen-sm flex flex-col gap-8 overflow-auto sm:h-[calc(100%-4rem)]">
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
        <TabsContent value="images">
          <ImagePicker
            images={[
              {
                id: 'original_256',
                alt: 'Original 256',
                src: getImageSrc(doc, 'original_256'),
              },
              {
                id: 'cropped',
                alt: 'Cropped 256',
                src: getImageSrc(doc, 'cropped_256'),
              },
              {
                id: 'original_full',
                alt: 'Original full',
                src: getImageSrc(doc, 'original_full'),
                thumbnail: getImageSrc(doc, 'original_256'),
              },
              {
                id: 'cropped_full',
                alt: 'Cropped full',
                src: getImageSrc(doc, 'cropped'),
                thumbnail: getImageSrc(doc, 'cropped_256'),
              },
            ]}
          />
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
      </Tabs>
    </DialogContent>
  )
}
