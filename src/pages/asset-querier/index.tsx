import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { useData } from '@/hooks/useData'
import { Sort, ViewMode } from '@/types/settings'
import { useState } from 'react'
import { DataGallery } from './data-gallery'
import { DataTable } from './data-table'
import { Settings } from './settings'
import { Loader2Icon } from 'lucide-react'

const PAGE_SIZE = 100

export const AssetQuerier = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [sort, setSort] = useState<Sort>({
    key: 'id',
    order: 'asc',
  })
  const [page, setPage] = useState(0)
  const { data, isPending } = useData({ page, pageSize: PAGE_SIZE, sort })

  return (
    <>
      <PageContent>
        <div className="flex items-stretch gap-12 mb-16 py-12">
          <Settings
            viewMode={viewMode}
            setViewMode={setViewMode}
            sort={sort}
            setSort={setSort}
          />
          {isPending ? (
            <div className="w-full flex items-center justify-center">
              <Loader2Icon className="w-16 h-16 animate-spin opacity-50" />
            </div>
          ) : (
            <>
              {viewMode === 'table' && (
                <DataTable docs={data?.docs} sort={sort} setSort={setSort} />
              )}
              {viewMode === 'gallery' && <DataGallery docs={data?.docs} />}
            </>
          )}
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
    </>
  )
}
