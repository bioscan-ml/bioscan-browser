import { GalleryItem } from '@/components/gallery/gallery-item'
import { PageContent } from '@/components/page-content'
import { Button } from '@/components/ui/button'
import { useRecords } from '@/hooks/useRecords'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  DatabaseIcon,
  DnaIcon,
  ImageIcon,
  MapPin,
  RulerIcon,
  SearchIcon,
  TagIcon,
} from 'lucide-react'
import { ComponentType, ReactNode, useMemo } from 'react'

export const Home = () => {
  const sort = useMemo(() => {
    const seed = new Date().getTime()

    return {
      key: `random_${seed}`,
    }
  }, [])

  const { data, isPending, error } = useRecords({
    page: 1,
    pageSize: 10,
    sort,
  })

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
            <Button className="rounded-full" size="icon" variant="ghost">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="w-[240px]">
              {data?.docs[0] ? (
                <GalleryItem compact doc={data.docs[0]} onClick={() => {}} />
              ) : null}
            </div>
            <Button className="rounded-full" size="icon" variant="ghost">
              <ChevronRight className="w-4 h-4" />
            </Button>
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
            <Button size="lg">
              <SearchIcon className="w-4 h-4 mr-2" /> Browse records
            </Button>
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
        <div className="max-w-2xl flex flex-col items-center mx-auto">
          <h1 className="mb-16 text-accent">Distribution of Taxa</h1>
          <div className="w-full aspect-square flex items-center justify-center bg-background rounded-full border">
            <p className="body-base uppercase opacity-50">Sunburst chart</p>
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
            <GalleryItem key={doc.id} compact doc={doc} onClick={() => {}} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button size="lg">
            <SearchIcon className="w-4 h-4 mr-2" />
            Browse records
          </Button>
        </div>
      </Block>
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
