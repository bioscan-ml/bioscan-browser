import { DocDetailsDialog } from '@/components/doc-details/doc-details-dialog'
import { GalleryItem } from '@/components/gallery/gallery-item'
import { MultiModalGalleryItem } from '@/components/gallery/multi-modal-gallery-item'
import { Loader } from '@/components/loader'
import { PageContent } from '@/components/page-content'
import { buttonVariants } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useRecords } from '@/hooks/useRecords'
import { PATHS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Doc } from '@/types/response-data'
import Autoplay from 'embla-carousel-autoplay'
import {
  DatabaseIcon,
  DnaIcon,
  ImageIcon,
  MapPin,
  RulerIcon,
  SearchIcon,
  TagIcon,
} from 'lucide-react'
import { ComponentType, ReactNode, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  const [activeDoc, setActiveDoc] = useState<Doc>()

  const sort = useMemo(() => {
    const seed = new Date().getTime()

    return {
      key: `random_${seed}`,
    }
  }, [])

  const { data, isPending } = useRecords({
    page: 1,
    pageSize: 10,
    sort,
  })

  if (isPending || !data) {
    return (
      <Block>
        <Loader />
      </Block>
    )
  }

  return (
    <>
      <Block>
        <div className="mb-32 text-center">
          <h1 className="mb-4 text-accent text-4xl">BIOSCAN Browser</h1>
          <h2 className="text-2xl">
            Visualizing a Multimodal Dataset for Insect Biodiversity
          </h2>
        </div>
        <div className="max-w-4xl flex items-center justify-center gap-8 mx-auto">
          <div className="flex items-center gap-4">
            <RecordCarousel docs={data.docs} setActiveDoc={setActiveDoc} />
          </div>
          <div>
            <h1 className="mb-4 text-accent">The Dataset</h1>
            <p className="mb-8 text-muted-foreground">
              BIOSCAN-5M is a dataset containing multi-modal information for 5
              million insect specimens. Except for high resolution images, the
              dataset includes taxonomic labels, raw nucleotide barcode
              sequences, assigned barcode index numbers, and geographical
              information.
            </p>
            <Link className={buttonVariants({ size: 'lg' })} to={PATHS.SEARCH}>
              <SearchIcon className="w-4 h-4 mr-2" />
              Browse records
            </Link>
          </div>
        </div>
      </Block>
      <Block className="bg-muted border-y">
        <div className="max-w-4xl grid grid-cols-2 gap-x-32 gap-y-16 mx-auto">
          <Feature Icon={DatabaseIcon} title="Data Volume">
            Multimodal information for over 5 million insect specimens,
            significantly expanding existing image-based biological datasets.
          </Feature>
          <Feature Icon={ImageIcon} title="RGB Images">
            High-resolution microscopy images (120 pixels per mm).
          </Feature>
          <Feature Icon={DnaIcon} title="DNA Barcodes">
            Unique 660-base-pair sequences for automated species identification,
            with each image paired to a DNA barcode.
          </Feature>
          <Feature Icon={TagIcon} title="Taxonomic Labels">
            Hierarchical annotations to fine-grained species level, plus barcode
            index numbers (BINs) at sub-species granularity.
          </Feature>
          <Feature Icon={MapPin} title="Geographic Data">
            Specimen collection sites enable species distribution modeling.
          </Feature>
          <Feature Icon={RulerIcon} title="Size Data">
            Supporting biodiversity analysis and ML models for classification
            and species comparison.
          </Feature>
        </div>
      </Block>
      <Block>
        <div className="mb-16">
          <div className="w-full h-[480px] flex items-center justify-center bg-muted rounded-lg border">
            <p className="body-base uppercase opacity-50">Cluster map</p>
          </div>
        </div>
        <div className="flex justify-center gap-16">
          <Count label="Countries" count={47} />
          <Count label="Sites" count={1650} />
          <Count label="Specimens" count={5150850} />
        </div>
      </Block>
      <Block className="bg-muted border-y">
        <div className="flex flex-col items-center mx-auto">
          <h1 className="mb-16 text-accent">Distribution of Taxa</h1>
          <div className="w-full grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <img
                alt=""
                className="w-full p-8 bg-background rounded-md border"
                src="/assets/class-chart.png"
              />
              <p className="text-sm italic text-muted-foreground">
                Figure 1: Class distribution for phylum Arthropoda (Arthropods).
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <img
                alt=""
                className="w-full p-8 bg-background rounded-md border"
                src="/assets/order-chart.png"
              />
              <p className="text-sm italic text-muted-foreground">
                Figure 2: Order distribution for class Insecta (Insects).
              </p>
            </div>
          </div>
        </div>
      </Block>
      <Block>
        <div className="max-w-2xl mx-auto mb-16">
          <div className="text-center">
            <img
              alt=""
              className="w-24 h-24 mx-auto mb-8"
              src="/assets/logos/bioscan-browser.png"
            />
            <h1 className="mb-4 text-accent">The Browser</h1>
            <p className="text-muted-foreground">
              The BIOSCAN Browser provides a user-friendly interface to navigate
              the BIOSCAN-5M dataset. The idea behind the browser is to lower
              the threshold for users to explore the dataset by presenting data
              in interactive and comprehensive ways. Our long-term goal for the
              tool is to help improve data quality, by making incorrect or
              missing data easier to spot and report.
            </p>
          </div>
        </div>
        <div className="max-w-4xl grid grid-cols-1 gap-4 mx-auto mb-16 md:grid-cols-3 lg:grid-cols-5">
          {data?.docs.map((doc) => (
            <GalleryItem
              key={doc.id}
              compact
              doc={doc}
              onClick={() => setActiveDoc(doc)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Link className={buttonVariants({ size: 'lg' })} to={PATHS.SEARCH}>
            <SearchIcon className="w-4 h-4 mr-2" />
            Browse records
          </Link>
        </div>
      </Block>
      <DocDetailsDialog
        doc={activeDoc}
        open={!!activeDoc}
        onOpenChange={(open) => {
          if (!open) {
            setActiveDoc(undefined)
          }
        }}
      />
    </>
  )
}

const Block = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={cn('py-32', className)}>
    <PageContent>{children}</PageContent>
  </div>
)

const RecordCarousel = ({
  docs,
  setActiveDoc,
}: {
  docs: Doc[]
  setActiveDoc: (doc: Doc) => void
}) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <div className="px-12">
      <Carousel
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="w-[320px]">
          {docs.map((doc) => (
            <CarouselItem key={doc.id}>
              <MultiModalGalleryItem
                doc={doc}
                onClick={() => setActiveDoc(doc)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

const Feature = ({
  Icon,
  title,
  children,
}: {
  Icon: ComponentType<{ className?: string }>
  title: string
  children: ReactNode
}) => (
  <div>
    <div className="flex items-center gap-4 mb-4 text-accent">
      <Icon className="w-8 h-8" />
      <h2>{title}</h2>
    </div>
    <p className="text-muted-foreground">{children}</p>
  </div>
)

const Count = ({ count, label }: { count: number; label: string }) => (
  <div className="flex flex-col gap-4">
    <span className="text-5xl" style={{ fontFamily: 'Source Code' }}>
      {count.toLocaleString()}
    </span>
    <span className="body-base text-muted-foreground uppercase">{label}</span>
  </div>
)
