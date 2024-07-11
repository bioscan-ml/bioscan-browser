import { DocDetails } from '@/components/doc-details'
import { Gallery } from '@/components/gallery'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { Table } from '@/components/table'
import { ViewModeControl } from '@/components/view-mode-control'
import { useRecords } from '@/hooks/useRecords'
import { FIELDS, PAGE_SIZE } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Sort, ViewMode } from '@/types/settings'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

export const AssetQuerier = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [sort, setSort] = useState<Sort>({
    key: 'id',
    order: 'asc',
  })
  const [page, setPage] = useState(0)
  const [activeDoc, setActiveDoc] = useState<Doc | undefined>()
  const { data, isPending } = useRecords({ page, pageSize: PAGE_SIZE, sort })

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 sm:flex sm:gap-8 sm:py-8">
          <Sidebar>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">View mode</label>
                <ViewModeControl
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </div>
              <div className="space-y-2 grow">
                <label className="text-sm font-medium">Order by</label>
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </div>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {isPending ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2Icon className="w-16 h-16 animate-spin opacity-50" />
              </div>
            ) : (
              <>
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
                  />
                )}
              </>
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
      <DocDetails
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
