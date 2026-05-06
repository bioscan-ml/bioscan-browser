import { DocDetailsDialog } from '@/components/doc-details/doc-details-dialog'
import { Footer } from '@/components/footer'
import { GalleryItem } from '@/components/gallery/gallery-item'
import { MultiModalGalleryItem } from '@/components/gallery/multi-modal-gallery-item'
import { Loader } from '@/components/loader'
import { Button, buttonVariants } from '@/components/ui/button'
import { CarouselItem } from '@/components/ui/carousel'
import { useSampleRecords } from '@/hooks/useSampleRecords'
import { PATHS } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import {
  ChevronsDownIcon,
  DatabaseIcon,
  DnaIcon,
  ImageIcon,
  MapPin,
  RulerIcon,
  SearchIcon,
  TagIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Block } from './block'
import { Count } from './count'
import { Feature } from './feature'
import { IntroCarousel } from './intro-carousel'
import { RankChart } from './rank-chart'

export const Home = () => {
  const { data } = useSampleRecords()
  const [activeDoc, setActiveDoc] = useState<Doc>()

  const docs = useMemo(() => {
    if (!data?.docs) {
      return undefined
    }

    return [...data.docs].sort(() => Math.random() - 0.5).slice(0, 10)
  }, [data?.docs])

  const doc = docs?.[0]

  if (!docs || !doc) {
    return (
      <Block>
        <Loader />
      </Block>
    )
  }

  return (
    <>
      <Block className="flex md:hidden">
        <div className="flex flex-col items-center gap-8 px-4">
          <div className="text-center">
            <h1 className="mb-4 text-accent">BIOSCAN Browser</h1>
            <h2 className="mb-8">
              Visualizing a Multimodal Dataset for Insect Biodiversity
            </h2>
            <p className="text-muted-foreground">
              BIOSCAN-5M is a large-scale multimodal dataset of over 5 million
              insect specimens. Each record links high-resolution images with
              taxonomic labels, raw DNA barcode sequences, Barcode Index Numbers
              (BINs), and geographic information.
            </p>
          </div>
          <MultiModalGalleryItem doc={doc} onClick={() => setActiveDoc(doc)} />
          <Link className={buttonVariants({ size: 'lg' })} to={PATHS.SEARCH}>
            <SearchIcon className="w-4 h-4 mr-2" />
            Browse records
          </Link>
        </div>
      </Block>
      <Block className="py-16 px-7 hidden md:flex">
        <IntroCarousel>
          <CarouselItem>
            <div className="flex gap-16 p-16">
              <div>
                <h1 className="mb-4 text-accent text-4xl">BIOSCAN Browser</h1>
                <h2 className="mb-8 text-2xl">
                  Visualizing a Multimodal Dataset for Insect Biodiversity
                </h2>
                <p className="mb-8 text-muted-foreground md:mb-16">
                  BIOSCAN-5M is a large-scale multimodal dataset of over 5
                  million insect specimens. Each record links high-resolution
                  images with taxonomic labels, raw DNA barcode sequences,
                  Barcode Index Numbers (BINs), and geographic information.
                </p>
                <Link
                  className={buttonVariants({ size: 'lg' })}
                  to={PATHS.SEARCH}
                >
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Browse records
                </Link>
              </div>
              <div className="w-[320px] shrink-0">
                <MultiModalGalleryItem
                  doc={doc}
                  onClick={() => setActiveDoc(doc)}
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-full flex gap-16 p-8 relative">
              <div className="w-[320px] h-min shrink-0 p-8 bg-background/90 rounded-md border">
                <h2 className="mb-4 text-2xl">Geographic Span</h2>
                <p className="mb-16 text-muted-foreground">
                  Specimens were collected across 47 countries on 5 continents,
                  representing a wide range of climates, habitats, and insect
                  communities.
                </p>
                <Button
                  onClick={() => {
                    const element = document.getElementById('map')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Learn more
                  <ChevronsDownIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="grow grid items-center">
                <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    src="/assets/cluster-map-compact.png"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-full grid p-8 lg: lg:grid-cols-3">
              <div className="p-8 order-last lg:order-first">
                <h2 className="mb-4 text-2xl">Distribution of Taxa</h2>
                <p className="mb-16 text-muted-foreground">
                  The dataset covers arthropods, with 98% of records
                  representing insects. Within insects, it spans a wide
                  taxonomic range, from common groups such as flies and
                  mosquitoes (Order Diptera) to rarely encountered groups such
                  as angel insects (Order Zoraptera) and snakeflies (Order
                  Raphidioptera).
                </p>
                <Button
                  onClick={() => {
                    const element = document.getElementById('taxa-distribution')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Learn more
                  <ChevronsDownIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="col-span-2">
                <img
                  alt=""
                  className="w-full px-8"
                  src="/assets/taxa-chart-compact.png"
                />
              </div>
            </div>
          </CarouselItem>
        </IntroCarousel>
      </Block>
      <Block className="bg-muted border-y">
        <div className="max-w-4xl grid grid-cols-1 gap-x-32 gap-y-8 mx-auto md:grid-cols-2 md:gap-y-16">
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
            index numbers (BINs) at species-level or finer granularity.
          </Feature>
          <Feature Icon={MapPin} title="Geographic Data">
            Specimen collection sites enable species distribution modeling.
          </Feature>
          <Feature Icon={RulerIcon} title="Size Data">
            Pixel-based estimates of specimen body size converted to
            millimetres, supporting biodiversity analysis and size-based
            classification.
          </Feature>
        </div>
      </Block>
      <Block id="map">
        <div className="w-full max-w-4xl mx-auto mb-8 p-4 bg-muted rounded-md border md:mb-16">
          <img alt="" src="/assets/cluster-map.png" />
        </div>
        <div className="flex justify-center gap-8 md:gap-16">
          <Count label="Countries" count={47} />
          <Count label="Sites" count={1650} />
          <Count label="Specimens" count={5150850} />
        </div>
      </Block>
      <Block className="bg-muted border-y" id="taxa-distribution">
        <div className="max-w-4xl flex flex-col items-center mx-auto">
          <h1 className="mb-8 text-accent md:mb-16">Distribution of Taxa</h1>
          <div className="w-full flex flex-col gap-8 md:gap-16">
            <div className="flex flex-col gap-2">
              <img
                alt=""
                className="w-full p-4 bg-background rounded-md border md:p-16"
                src="/assets/taxa-chart.png"
              />
              <p className="text-sm italic text-muted-foreground">
                Distribution of taxa for Phylum Arthropoda (Arthropods) and
                Class Insecta (Insects).
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full p-4 bg-background rounded-md border overflow-auto md:p-8">
                <RankChart />
              </div>
              <p className="text-sm italic text-muted-foreground">
                Records identified per taxonomic level.
              </p>
            </div>
          </div>
        </div>
      </Block>
      <Block>
        <div className="max-w-2xl mx-auto mb-8 md:mb-16">
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
              the barrier for users to explore the dataset by presenting data in
              interactive and comprehensive ways. Our long-term goal for the
              browser is to help improve data quality, by making incorrect or
              missing data easier to spot and report.
            </p>
          </div>
        </div>
        <div className="max-w-4xl grid grid-cols-1 gap-4 mx-auto mb-8 md:grid-cols-3 lg:grid-cols-5 md:mb-16">
          {docs.map((doc) => (
            <GalleryItem
              key={doc.id}
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
      <Footer />
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
