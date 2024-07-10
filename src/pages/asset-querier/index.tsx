import { DocDetails } from '@/components/doc-details'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { useRecords } from '@/hooks/useRecords'
import { Doc } from '@/types/response-data'
import { Sort, ViewMode } from '@/types/settings'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { DataGallery } from './data-gallery'
import { DataTable } from './data-table'
import { Settings } from './settings'

const PAGE_SIZE = 100

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
        <div className="flex items-start gap-8 py-8">
          <Sidebar>
            <Settings
              viewMode={viewMode}
              setViewMode={setViewMode}
              sort={sort}
              setSort={setSort}
            />
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {isPending ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2Icon className="w-16 h-16 animate-spin opacity-50" />
              </div>
            ) : (
              <>
                {viewMode === 'table' && (
                  <DataTable
                    docs={data?.docs}
                    sort={sort}
                    onRowClick={(doc) => setActiveDoc(doc)}
                    setSort={setSort}
                  />
                )}
                {viewMode === 'gallery' && (
                  <DataGallery
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
