import { DocDetailsDialog } from '@/components/doc-details/doc-details'
import { Gallery } from '@/components/gallery/gallery'
import { Loader } from '@/components/loader'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar, SidebarSection } from '@/components/sidebar'
import { Table } from '@/components/table'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { usePagination } from '@/hooks/search-params/usePagination'
import { useRecordId } from '@/hooks/search-params/useRecordId'
import { useSort } from '@/hooks/search-params/useSort'
import { useEmbeddings } from '@/hooks/useEmbeddings'
import { useRandomRecord } from '@/hooks/useRandomRecord'
import { useRecord } from '@/hooks/useRecord'
import { DEFAULT_PAGINATION, DEFAULT_SORT, FIELDS } from '@/lib/constants'
import { SearchType, ViewMode } from '@/types/settings'
import { DicesIcon, SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { GalleryItem } from './gallery/gallery-item'
import { SearchTypeControl } from './search-type-control'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const SearchSimilar = () => {
  const [searchString, setSearchString] = useState<string>('')
  const { recordId, setRecordId } = useRecordId()
  const [searchFrom, setSearchFrom] = useState<SearchType>('image')
  const [searchTo, setSearchTo] = useState<SearchType>('image')
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const { page, pageSize, setPage, setPageSize } =
    usePagination(DEFAULT_PAGINATION)
  const { sort, setSort } = useSort(DEFAULT_SORT)
  const { data, isPending } = useEmbeddings(recordId ?? undefined)
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

  useEffect(() => {
    setSearchString(recordId ?? '')
  }, [recordId])

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 md:flex md:gap-8 md:py-8">
          <Sidebar>
            <div className="space-y-8">
              <SidebarSection label="Query record">
                {recordId ? <RecordDetails recordId={recordId} /> : null}
                <div className="flex gap-2">
                  <Input
                    placeholder="Specify a record ID"
                    value={searchString}
                    onChange={(e) => setSearchString(e.currentTarget.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => setRecordId(searchString)}
                  >
                    <SearchIcon className="w-4 h-4" />
                  </Button>
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
              <SidebarSection label="View mode">
                <ViewModeControl
                  type="search-similar"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SidebarSection>
              <SidebarSection label="Order by">
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </SidebarSection>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            {isPending ? (
              <Loader />
            ) : data?.docs.length ? (
              <>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">
                    Closest matches
                  </h2>
                </div>
                {viewMode === 'table' && (
                  <Table
                    docs={data?.docs}
                    sort={sort}
                    onRowClick={(doc) => setActiveDoc(doc)}
                    setSort={setSort}
                  />
                )}
                {viewMode === 'gallery' && (
                  <Gallery
                    docs={data?.docs}
                    onItemClick={(doc) => setActiveDoc(doc)}
                    onSearchClick={(doc) => setRecordId(doc.id)}
                  />
                )}
              </>
            ) : recordId ? (
              <Intro
                title="No similar records found"
                description="No matches was found for the current search, please try a different query record."
                onSubmit={(recordId) => setRecordId(recordId)}
              />
            ) : (
              <Intro
                title="Get started"
                description="To search similar records, first specify a query record."
                onSubmit={(recordId) => setRecordId(recordId)}
              />
            )}
          </div>
        </div>
      </PageContent>
      {data && (
        <PaginationBar
          data={data}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      )}
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

const RecordDetails = ({ recordId }: { recordId: string }) => {
  const [open, setOpen] = useState(false)
  const { data } = useRecord(recordId)

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

const Intro = ({
  title,
  description,
  onSubmit,
}: {
  title: string
  description: string
  onSubmit: (recordId: string) => void
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
          placeholder="Specify a record ID"
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
      <RandomSearch onClick={(recordId) => onSubmit(recordId)} />
    </div>
  )
}

const RandomSearch = ({ onClick }: { onClick: (recordId: string) => void }) => {
  const seed = useMemo(() => Date.now(), [])
  const { data } = useRandomRecord(seed)

  return (
    <Button
      variant="outline"
      className="shrink-0"
      onClick={() => {
        if (data) {
          onClick(data?.id)
        }
      }}
    >
      Try a random record
      <DicesIcon className="w-4 h-4 ml-2" />
    </Button>
  )
}
