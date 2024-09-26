import {
  DocDetailsDialog,
  DocDetailsDialogContent,
} from '@/components/doc-details/doc-details'
import { Gallery } from '@/components/gallery'
import { Loader } from '@/components/loader'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { Table } from '@/components/table'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { usePage } from '@/hooks/search-params/usePage'
import { useRecordId } from '@/hooks/search-params/useRecordId'
import { useSort } from '@/hooks/search-params/useSort'
import { useEmbeddings } from '@/hooks/useEmbeddings'
import { useRecord } from '@/hooks/useRecord'
import { DEFAULT_PAGE, DEFAULT_SORT, FIELDS, PAGE_SIZE } from '@/lib/constants'
import { ViewMode } from '@/types/settings'
import { InfoIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'

export const SearchSimilar = () => {
  const [searchString, setSearchString] = useState<string>('')
  const { recordId, setRecordId } = useRecordId()
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const { page, setPage } = usePage(DEFAULT_PAGE)
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Record ID</label>
                <div className="flex gap-2">
                  <Input
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">View mode</label>
                <ViewModeControl
                  type="search-similar"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order by</label>
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </div>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            {isPending ? (
              <Loader />
            ) : recordId?.length ? (
              <>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">
                    Embeddings for {recordId}
                  </h2>
                  <RecordDetails recordId={recordId} />
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
                {!data?.docs.length ? <NoEmbeddingsFound /> : null}
              </>
            ) : (
              <GetStarted onSubmit={(recordId) => setRecordId(recordId)} />
            )}
          </div>
        </div>
      </PageContent>
      {data && (
        <PaginationBar
          currentPage={page}
          data={data}
          pageSize={PAGE_SIZE}
          setPage={setPage}
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
  const { data } = useRecord(recordId)

  if (!data) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      {data && <DocDetailsDialogContent doc={data} showEmbeddings={false} />}
    </Dialog>
  )
}

const GetStarted = ({ onSubmit }: { onSubmit: (recordId: string) => void }) => {
  const [searchString, setSearchString] = useState<string>('')

  return (
    <div className="text-center space-y-8 p-16">
      <div>
        <p className="text-xl font-medium mb-2">Get started</p>
        <p className="text-sm text-muted-foreground">
          To search embeddings, first specify a record ID.
        </p>
      </div>
      <div className="w-full max-w-64 flex gap-2 mx-auto">
        <Input
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
    </div>
  )
}

const NoEmbeddingsFound = () => (
  <div className="text-center space-y-8 p-16">
    <div>
      <p className="text-xl font-medium mb-2">No embeddings found</p>
      <p className="text-sm text-muted-foreground">
        The current record ID did not match any embeddings.
      </p>
    </div>
  </div>
)
