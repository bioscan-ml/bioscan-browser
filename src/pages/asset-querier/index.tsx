import { DocDetailsDialog } from '@/components/doc-details/doc-details'
import { Error } from '@/components/error'
import { FilterControl } from '@/components/filter-control'
import { Gallery } from '@/components/gallery'
import { Loader } from '@/components/loader'
import { NoRecordsFound } from '@/components/no-records-found'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar, SidebarSection } from '@/components/sidebar'
import { Table } from '@/components/table'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { usePage } from '@/hooks/search-params/usePage'
import { useSort } from '@/hooks/search-params/useSort'
import { useFacetCounts } from '@/hooks/useFacetCounts'
import { useFilters } from '@/hooks/useFilters'
import { useRecords } from '@/hooks/useRecords'
import { DEFAULT_PAGE, DEFAULT_SORT, FIELDS, PAGE_SIZE } from '@/lib/constants'
import { ViewMode } from '@/types/settings'
import { useState } from 'react'

export const AssetQuerier = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const { page, setPage } = usePage(DEFAULT_PAGE)
  const { sort, setSort } = useSort(DEFAULT_SORT)
  const { filters, filterQuery, addFilter, removeFilter, clearFilters } =
    useFilters()
  const { data, isPending, error } = useRecords({
    page,
    pageSize: PAGE_SIZE,
    q: filterQuery,
    sort,
  })
  const { facetCounts } = useFacetCounts()
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 md:flex md:gap-8 md:py-8">
          <Sidebar>
            <div className="space-y-8">
              <SidebarSection label="View mode">
                <ViewModeControl
                  type="asset-querier"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SidebarSection>
              <SidebarSection label="Order by">
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </SidebarSection>
              <SidebarSection label="Filters">
                <FilterControl
                  facetCounts={facetCounts}
                  filters={filters}
                  onAdd={addFilter}
                  onClear={clearFilters}
                  onRemove={removeFilter}
                />
              </SidebarSection>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {isPending ? (
              <Loader />
            ) : error ? (
              <Error />
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
                {data?.docs.length === 0 && (
                  <NoRecordsFound onClearFilters={clearFilters} />
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
