import { DocDetailsDialog } from '@/components/doc-details/doc-details'
import { Gallery } from '@/components/gallery/gallery'
import { Loader } from '@/components/loader'
import { PageContent } from '@/components/page-content'
import { Sidebar, SidebarSection } from '@/components/sidebar'
import { Table } from '@/components/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { usePageSize } from '@/hooks/search-params/usePageSize'
import { useSampleId } from '@/hooks/search-params/useSampleId'
import { useSearchType } from '@/hooks/search-params/useSearchType'
import { useRandomSampleId } from '@/hooks/useRandomSampleId'
import { useRecord } from '@/hooks/useRecord'
import { useSearchEmbeddings } from '@/hooks/useSearchEmbeddings'
import { cn } from '@/lib/utils'
import { ViewMode } from '@/types/settings'
import {
  AlertCircleIcon,
  DicesIcon,
  Loader2Icon,
  RocketIcon,
  SearchIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { GalleryItem } from './gallery/gallery-item'
import { SearchTypeControl } from './search-type-control'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

const PAGE_SIZE_OPTIONS = [10, 50, 100]

export const SearchSimilar = () => {
  const [searchString, setSearchString] = useState<string>('')
  const { sampleId, setSampleId } = useSampleId()
  const { searchFrom, setSearchFrom, searchTo, setSearchTo } = useSearchType()
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const { pageSize, setPageSize } = usePageSize()
  const { data, isPending } = useSearchEmbeddings({
    sampleId,
    searchFrom,
    searchTo,
    pageSize,
  })
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

  useEffect(() => {
    setSearchString(sampleId ?? '')
  }, [sampleId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [data])

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 md:flex md:gap-8 md:py-8">
          <Sidebar avoidPaginationBar={false}>
            <div className="space-y-8">
              <SidebarSection label="Query record">
                {sampleId ? <RecordDetails sampleId={sampleId} /> : null}
                <div className="flex gap-2">
                  <Input
                    placeholder="Specify a sample ID"
                    value={searchString}
                    onChange={(e) => setSearchString(e.currentTarget.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => setSampleId(searchString)}
                  >
                    <SearchIcon className="w-4 h-4" />
                  </Button>
                  <RandomSearch onClick={setSampleId} size="icon" />
                </div>
              </SidebarSection>
              <div className="flex gap-8">
                <SidebarSection className="md:w-min" label="Search from">
                  <SearchTypeControl
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
              <SidebarSection label="View mode">
                <ViewModeControl
                  type="find-similar"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SidebarSection>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b">
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                Find similar
              </h2>
              <Badge variant="outline">Experimental</Badge>
            </div>
            {isPending && sampleId ? (
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
                  <Gallery
                    docs={data?.docs}
                    onItemClick={(doc) => setActiveDoc(doc)}
                    onSearchClick={(doc) => setSampleId(doc.sampleid)}
                  />
                )}
              </>
            ) : sampleId ? (
              <Intro
                description="No matches were found, please try a different query record."
                error
                onSubmit={(sampleId) => setSampleId(sampleId)}
                title="No similar records found"
              />
            ) : (
              <Intro
                description="To find similar records, first specify a query record."
                onSubmit={(sampleId) => setSampleId(sampleId)}
                title="Get started"
              />
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

const RecordDetails = ({ sampleId }: { sampleId: string }) => {
  const [open, setOpen] = useState(false)
  const { data } = useRecord(sampleId, 'sampleid')

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
  error,
  title,
  description,
  onSubmit,
}: {
  error?: boolean
  title: string
  description: string
  onSubmit: (sampleId: string) => void
}) => {
  const [searchString, setSearchString] = useState<string>('')

  return (
    <div className="text-center space-y-8 p-16">
      {error ? (
        <AlertCircleIcon className="text-destructive inline" />
      ) : (
        <RocketIcon className="w-10 h-10 text-accent inline" />
      )}
      <div>
        <p className="text-xl font-medium mb-2">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="w-full max-w-64 flex gap-2 mx-auto">
        <Input
          placeholder="Specify a sample ID"
          value={searchString}
          onChange={(e) => setSearchString(e.currentTarget.value)}
        />
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={() => onSubmit(searchString)}
        >
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">or</p>
      <div>
        <RandomSearch onClick={onSubmit} />
      </div>
    </div>
  )
}

const RandomSearch = ({
  onClick: _onClick,
  size = 'sm',
}: {
  onClick: (sampleId: string) => void
  size?: 'sm' | 'icon'
}) => {
  const [seed, setSeed] = useState(Date.now())
  const { data, isPending, error } = useRandomSampleId(seed)
  const isLoading = !data && isPending

  const iconClassName = cn('w-4 h-4', {
    'ml-2': size === 'sm',
  })

  const onClick = () => {
    if (data) {
      _onClick(data)
    }
    setSeed(Date.now())
  }

  const tooltip = error
    ? 'Could not load random records, please try again later.'
    : size === 'icon'
      ? 'Try a random record'
      : undefined

  if (tooltip) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              variant="outline"
              size={size}
              className="shrink-0"
              onClick={onClick}
            >
              {size === 'sm' ? <span>Try a random record</span> : null}
              {error ? (
                <AlertCircleIcon
                  className={cn(iconClassName, 'text-destructive')}
                />
              ) : isLoading ? (
                <Loader2Icon className={cn(iconClassName, 'animate-spin')} />
              ) : (
                <DicesIcon className={iconClassName} />
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

  return (
    <Button
      disabled={isLoading}
      variant="outline"
      size={size}
      className="shrink-0"
      onClick={onClick}
    >
      {size === 'sm' ? <span>Try a random record</span> : null}
      {error ? (
        <AlertCircleIcon className={cn(iconClassName, 'text-destructive')} />
      ) : isLoading ? (
        <Loader2Icon className={cn(iconClassName, 'animate-spin')} />
      ) : (
        <DicesIcon className={iconClassName} />
      )}
    </Button>
  )
}
