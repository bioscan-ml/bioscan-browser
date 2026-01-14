import { DocDetailsDialog } from '@/components/doc-details/doc-details-dialog'
import { Gallery } from '@/components/gallery/gallery'
import { Input } from '@/components/input'
import { Loader } from '@/components/loader'
import { PageContent } from '@/components/page-content'
import { Sidebar, SidebarSection } from '@/components/sidebar'
import { Table } from '@/components/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { UploadImage } from '@/components/ui/upload-image'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { useId } from '@/hooks/search-params/useId'
import { usePageSize } from '@/hooks/search-params/usePageSize'
import { useSearchType } from '@/hooks/search-params/useSearchType'
import { useFindSimilar } from '@/hooks/useFindSimilar'
import { useRandomSampleId } from '@/hooks/useRandomSampleId'
import { useRecord } from '@/hooks/useRecord'
import { ViewMode } from '@/types/settings'
import { TabsContent } from '@radix-ui/react-tabs'
import {
  AlertCircleIcon,
  DicesIcon,
  InfoIcon,
  RocketIcon,
  SearchIcon,
  UploadIcon,
} from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { FindSimilarControl } from '../../components/find-similar-control'
import { DnaBarcodeGalleryItem } from '../../components/gallery/dna-barcode-gallery-item'
import { GalleryItem } from '../../components/gallery/gallery-item'
import { SearchTypeControl } from '../../components/search-type-control'

const PAGE_SIZE_OPTIONS = [10, 50, 100]

export const FindSimilar = () => {
  const [queryType, setQueryType] = useState('record')
  const { id, setId } = useId()
  const [image, setImage] = useState<File | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const { searchFrom, setSearchFrom, searchTo, setSearchTo } = useSearchType()
  const { pageSize, setPageSize } = usePageSize()
  const { data, isLoading, refetch } = useFindSimilar({
    id,
    image,
    searchFrom,
    searchTo,
    pageSize,
  })
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

  useEffect(() => {
    if (id) {
      setQueryType('record')
      setImage(null)
    }
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [data])

  const onSubmit = (values: { id?: string; image?: File }) => {
    if (values.id) {
      setQueryType('record')
      if (id === values.id) {
        refetch()
      } else {
        setId(values.id)
        setImage(null)
      }
    } else {
      setId(null)
    }

    if (values.image) {
      setQueryType('image')
      if (image === values.image) {
        refetch()
      } else {
        setImage(values.image)
        setSearchFrom('Image')
        setId(null)
      }
    } else {
      setImage(null)
    }
  }

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 md:flex md:gap-8 md:py-8">
          <Sidebar avoidPaginationBar={false}>
            <div className="space-y-8">
              <SidebarSection
                accessory={<SearchQueryInfo />}
                label="Search query"
              >
                <Tabs value={queryType} onValueChange={setQueryType}>
                  <TabsList className="mb-2">
                    <TabsTrigger value="record">Record</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                  </TabsList>
                  <TabsContent className="flex flex-col gap-y-2" value="record">
                    <>
                      {id ? <RecordDetails id={id} /> : null}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Specify a process ID"
                          setValue={(value) => setId(value)}
                          value={id ?? ''}
                        />
                        <RandomSearch onClick={setId} />
                      </div>
                    </>
                  </TabsContent>
                  <TabsContent className="flex flex-col gap-y-2" value="image">
                    <>
                      {image ? (
                        <div className="rounded-md border border-input bg-card overflow-hidden relative">
                          <img src={URL.createObjectURL(image)} />
                        </div>
                      ) : null}
                      {image ? (
                        <div className="flex gap-2">
                          <UploadImage
                            onChange={(image) => onSubmit({ image })}
                          >
                            <span>Change image</span>
                          </UploadImage>
                          <Button
                            onClick={() => setImage(null)}
                            variant="ghost"
                          >
                            Clear
                          </Button>
                        </div>
                      ) : (
                        <UploadImage
                          className="w-full"
                          onChange={(image) => onSubmit({ image })}
                        >
                          <UploadIcon className="w-4 h-4 mr-2" />
                          <span>Upload image</span>
                        </UploadImage>
                      )}
                    </>
                  </TabsContent>
                </Tabs>
              </SidebarSection>
              <SidebarSection label="View mode">
                <ViewModeControl
                  type="find-similar"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SidebarSection>
              <div className="flex gap-8">
                <SidebarSection className="md:w-min" label="Search from">
                  <SearchTypeControl
                    disabled={!!image}
                    searchType={searchFrom}
                    setSearchType={setSearchFrom}
                  />
                </SidebarSection>
                <SidebarSection className="md:w-min" label="Search to">
                  <SearchTypeControl
                    searchType={searchTo}
                    setSearchType={setSearchTo}
                  />
                </SidebarSection>
              </div>
              <SidebarSection label="Number of records">
                <PageSizeControl
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                />
              </SidebarSection>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            <div className="h-10 flex items-center gap-4 mb-4 pb-4 border-b">
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                Find similar
              </h2>
              <Badge variant="outline">Experimental</Badge>
            </div>
            {isLoading && (id || image) ? (
              <Loader />
            ) : data?.docs.length ? (
              <>
                {viewMode === 'table' && (
                  <Table
                    docs={data?.docs}
                    onRowClick={(doc) => setActiveDoc(doc)}
                  />
                )}
                {viewMode === 'gallery' && (
                  <Gallery>
                    {data?.docs.map((doc) => (
                      <GalleryItem
                        key={doc.id}
                        doc={doc}
                        onClick={() => setActiveDoc(doc)}
                      >
                        <FindSimilarControl
                          className="m-2 absolute top-0 right-0"
                          doc={doc}
                          size="icon"
                          variant="outline"
                        />
                      </GalleryItem>
                    ))}
                  </Gallery>
                )}
                {viewMode === 'dna-barcode' && (
                  <div className="grid">
                    {data?.docs.map((doc) => (
                      <DnaBarcodeGalleryItem
                        key={doc.id}
                        doc={doc}
                        onClick={() => setActiveDoc(doc)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : id || image ? (
              <Intro error onSubmit={onSubmit} title="No similar records found">
                <p className="text-sm text-muted-foreground">
                  No matches were found, please try a different search query.
                </p>
              </Intro>
            ) : (
              <Intro onSubmit={onSubmit} title="Get started">
                <p className="mb-4 text-sm text-muted-foreground">
                  To search the BIOSCAN-5M dataset for similar records, first
                  specify a search query. You can use a process ID or an image.
                  For custom images, one sample per image is recommended.
                  In-the-wild images have not been tested.
                </p>
                <p className="text-sm text-muted-foreground">
                  The similarity search is based on{' '}
                  <a
                    className="text-link"
                    href="https://bioscan-ml.github.io/clibd/"
                  >
                    CLIBD
                  </a>
                  .
                </p>
              </Intro>
            )}
          </div>
        </div>
      </PageContent>
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

const SearchQueryInfo = () => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger>
        <InfoIcon className="w-4 h-4" />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="max-w-72 text-center">
          <p>
            For custom images, one sample per image is recommended. In-the-wild
            images have not been tested.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const RecordDetails = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const { data } = useRecord({ id })

  if (!data) {
    return null
  }

  return (
    <>
      <GalleryItem doc={data} onClick={() => setOpen(true)} />
      <DocDetailsDialog doc={data} open={open} onOpenChange={setOpen} />
    </>
  )
}

const PageSizeControl = ({
  pageSize,
  setPageSize,
}: {
  pageSize: number
  setPageSize: (pageSize: number) => void
}) => {
  const options = PAGE_SIZE_OPTIONS.some((option) => option === pageSize)
    ? PAGE_SIZE_OPTIONS
    : [...PAGE_SIZE_OPTIONS, pageSize].sort(
        (option1, option2) => option1 - option2,
      )

  return (
    <Select
      value={`${pageSize}`}
      onValueChange={(value) => setPageSize(Number(value))}
    >
      <SelectTrigger className="w-min">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={`${option}`}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const Intro = ({
  children,
  error,
  onSubmit,
  title,
}: {
  children: ReactNode
  error?: boolean
  onSubmit: (values: { id?: string; image?: File }) => void

  title: string
}) => {
  const [searchString, setSearchString] = useState<string>('')

  return (
    <div className="max-w-xl space-y-8 p-16 m-auto text-center">
      {error ? (
        <AlertCircleIcon className="text-destructive inline" />
      ) : (
        <RocketIcon className="w-10 h-10 text-accent inline" />
      )}
      <div>
        <p className="text-xl font-medium mb-2">{title}</p>
        {children}
      </div>
      <div className="w-full max-w-64 flex gap-2 mx-auto">
        <Input
          placeholder="Specify a process ID"
          setValue={setSearchString}
          value={searchString}
        />
        {searchString ? (
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => onSubmit({ id: searchString })}
          >
            <SearchIcon className="w-4 h-4" />
          </Button>
        ) : (
          <RandomSearch onClick={(id) => onSubmit({ id })} />
        )}
      </div>
      <p className="text-sm text-muted-foreground">or</p>
      <UploadImage onChange={(image) => onSubmit({ image })}>
        <UploadIcon className="w-4 h-4 mr-2" />
        <span>Upload image</span>
      </UploadImage>
    </div>
  )
}

const RandomSearch = ({
  onClick: _onClick,
}: {
  onClick: (queryId: string) => void
}) => {
  const [seed, setSeed] = useState(Date.now())
  const { data, isPending, error } = useRandomSampleId(seed)
  const isLoading = !data && isPending

  const tooltip = error
    ? 'Could not load random records, please try again later.'
    : 'Try a random record'

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="shrink-0"
            disabled={isLoading}
            onClick={() => {
              if (data) {
                _onClick(data)
              }
              setSeed(Date.now())
            }}
            size="icon"
            variant="outline"
          >
            {error ? (
              <AlertCircleIcon className="w-4 h-4 text-destructive" />
            ) : (
              <DicesIcon className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
