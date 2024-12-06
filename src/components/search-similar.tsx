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
import { useSampleId } from '@/hooks/search-params/useSampleId'
import { useRandomSampleId } from '@/hooks/useRandomSampleId'
import { useRecord } from '@/hooks/useRecord'
import { useSearchEmbeddings } from '@/hooks/useSearchEmbeddings'
import { SearchType, ViewMode } from '@/types/settings'
import { DicesIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GalleryItem } from './gallery/gallery-item'
import { SearchTypeControl } from './search-type-control'
import { Button } from './ui/button'
import { Input } from './ui/input'

const PAGE_SIZE_OPTIONS = [10, 50, 100]

export const SearchSimilar = () => {
  const [searchString, setSearchString] = useState<string>('')
  const { sampleId, setSampleId } = useSampleId()
  const [searchFrom, setSearchFrom] = useState<SearchType>('Image')
  const [searchTo, setSearchTo] = useState<SearchType>('Image')
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0])
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
                <Select
                  value={`${pageSize}`}
                  onValueChange={(value) => setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-min">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={`${option}`}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SidebarSection>
              <SidebarSection label="View mode">
                <ViewModeControl
                  type="search-similar"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SidebarSection>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            {isPending && sampleId ? (
              <Loader />
            ) : data?.docs.length ? (
              <>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">
                    Closest {data.docs.length} matches
                  </h2>
                </div>
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
                title="No similar records found"
                description="No matches was found for the current search, please try a different query record."
                onSubmit={(sampleId) => setSampleId(sampleId)}
              />
            ) : (
              <Intro
                title="Get started"
                description="To search similar records, first specify a query record."
                onSubmit={(sampleId) => setSampleId(sampleId)}
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
        showClosestMatches={activeDoc?.sampleid !== sampleId}
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
      <DocDetailsDialog
        doc={data}
        open={open}
        onOpenChange={setOpen}
        showClosestMatches={false}
      />
    </>
  )
}

const Intro = ({
  title,
  description,
  onSubmit,
}: {
  title: string
  description: string
  onSubmit: (sampleId: string) => void
}) => {
  const [searchString, setSearchString] = useState<string>('')

  return (
    <div className="text-center space-y-8 p-16">
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
      <RandomSearch onClick={onSubmit} />
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
  const { data } = useRandomSampleId(seed)

  const onClick = () => {
    if (data) {
      _onClick(data)
    }
    setSeed(Date.now())
  }

  if (size === 'icon') {
    return (
      <Button
        variant="outline"
        size="icon"
        className="shrink-0"
        onClick={onClick}
      >
        <DicesIcon className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" className="shrink-0" onClick={onClick}>
      Try a random record
      <DicesIcon className="w-4 h-4 ml-2" />
    </Button>
  )
}
