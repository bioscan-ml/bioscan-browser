import { useTaxonDetails } from '@/hooks/useTaxonDetails'
import { TaxonDetails } from '@/types/response-data'
import { ExternalLinkIcon, SearchIcon } from 'lucide-react'
import { ImagePicker } from './image-picker'
import { Loader } from './loader'
import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'

interface TaxonDetailsArticleProps {
  taxon: {
    label: string
    rankKey: string
  }
}

export const TaxonDetailsArticle = ({ taxon }: TaxonDetailsArticleProps) => {
  const { taxonDetails, isPending, error } = useTaxonDetails(taxon)

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  const message = error?.message.length
    ? error.message
    : `"${taxon.label}" was not recognized by external sources.`

  if (!taxonDetails) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-8 p-16 text-center">
        <div>
          <p className="text-xl font-medium mb-2">No information found</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <a
          className={buttonVariants({ variant: 'outline' })}
          href={`https://www.inaturalist.org/search?q=${taxon.label}&source=taxa`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SearchIcon className="w-4 h-4 mr-2" />
          Search iNaturalist
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Title taxonDetails={taxonDetails} />
      <Summary taxonDetails={taxonDetails} />
      <Images taxonDetails={taxonDetails} />
    </div>
  )
}

const Title = ({ taxonDetails }: { taxonDetails: TaxonDetails }) => {
  const commonName = taxonDetails.preferred_common_name

  return (
    <div className="flex items-center gap-4">
      <h3>
        {commonName
          ? `${taxonDetails.name} (${commonName})`
          : taxonDetails.name}
      </h3>
      <Badge variant="outline" className="uppercase">
        {taxonDetails.rank}
      </Badge>
    </div>
  )
}

const Summary = ({ taxonDetails }: { taxonDetails: TaxonDetails }) => {
  if (!taxonDetails.wikipedia_url || !taxonDetails.wikipedia_summary) {
    return null
  }

  if (taxonDetails.wikipedia_summary.length < 40) {
    return null
  }

  return (
    <div>
      <h3 className="text-sm">
        <a
          href={taxonDetails.wikipedia_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link font-bold mb-2"
        >
          Source: Wikipedia
          <ExternalLinkIcon className="ml-2 w-4 h-4" />
        </a>
      </h3>
      <p
        className="space-y-4 text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: taxonDetails.wikipedia_summary,
        }}
      />
    </div>
  )
}

const Images = ({ taxonDetails }: { taxonDetails: TaxonDetails }) => (
  <div>
    <h3 className="text-sm">
      <a
        href={`https://www.inaturalist.org/taxa/${taxonDetails.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link font-bold mb-2"
      >
        <span>Source: iNaturalist</span>
        <ExternalLinkIcon className="ml-2 w-4 h-4" />
      </a>
    </h3>
    {taxonDetails.taxon_photos.length ? (
      <ImagePicker
        images={taxonDetails.taxon_photos.map(({ photo, taxon }) => ({
          attribution: photo.attribution,
          badge: taxon.name,
          id: `${photo.id}`,
          original: `https://www.inaturalist.org/photos/${photo.id}`,
          src: photo.large_url,
          thumbnail: photo.small_url,
        }))}
      />
    ) : (
      <p className="text-sm text-muted-foreground">
        No images found for the current taxon.
      </p>
    )}
  </div>
)
