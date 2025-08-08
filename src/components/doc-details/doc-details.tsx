import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PATHS } from '@/lib/constants'
import { getTaxon } from '@/lib/getTaxon'
import { Doc } from '@/types/response-data'
import { ChevronRight } from 'lucide-react'
import { BookmarkControl } from '../bookmark-control'
import { CodeBlock } from '../code-block'
import { CopyLinkControl } from '../copy-link-control'
import { FindSimilarControl } from '../find-similar-control'
import { ReportIssueControl } from '../report-issue-control'
import { TaxonDetailsArticle } from '../taxon-details-article'
import { Dna } from './dna'
import { Fields } from './fields'
import { Images } from './images'
import { Map } from './map'

interface DocDetailsProps {
  doc: Doc
}

const getRecordLink = (id: string) =>
  `${window.location.protocol}//${window.location.host}${PATHS.RECORD.replace(':id', id)}`

export const DocDetails = ({ doc }: DocDetailsProps) => {
  const { taxon, parents } = getTaxon(doc)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col -m-6 mb-0 p-6 bg-muted border-b">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {taxon.label}
          </h2>
          <Badge variant="outline" className="uppercase">
            {taxon.rankLabel}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {parents.map((parent, index) => (
            <span key={index} className="inline-flex items-center">
              {parent.label}
              {index < parents.length - 1 && (
                <ChevronRight className="w-3 h-3 mx-1 opacity-50 inline" />
              )}
            </span>
          ))}
        </p>
        <div className="flex items-center gap-2">
          <FindSimilarControl doc={doc} variant="outline" />
          <BookmarkControl doc={doc} />
          <ReportIssueControl doc={doc} size="icon" />
          <CopyLinkControl link={getRecordLink(doc.id)} />
        </div>
      </div>
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
          <Map doc={doc} />
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
    </div>
  )
}
