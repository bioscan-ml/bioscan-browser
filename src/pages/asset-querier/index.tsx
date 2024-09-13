import { DocDetails } from '@/components/doc-details/doc-details'
import { FilterControl } from '@/components/filter-control'
import { Gallery } from '@/components/gallery'
import { Loader } from '@/components/loader'
import { NoRecordsFound } from '@/components/no-records-found'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { Table } from '@/components/table'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { usePage } from '@/hooks/search-params/usePage'
import { useSort } from '@/hooks/search-params/useSort'
import { useFacetCounts } from '@/hooks/useFacetCounts'
import { useFilters } from '@/hooks/useFilters'
import { useRecords } from '@/hooks/useRecords'
import {
  DEFAULT_PAGE,
  DEFAULT_SORT,
  FIELDS,
  FILTER_TYPES,
  PAGE_SIZE,
} from '@/lib/constants'
import { ViewMode } from '@/types/settings'
import { useState } from 'react'

export const AssetQuerier = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const { page, setPage } = usePage(DEFAULT_PAGE)
  const { sort, setSort } = useSort(DEFAULT_SORT)
  const { filters, filterQuery, addFilter, removeFilter, clearFilters } =
    useFilters()
  const { data, isPending } = useRecords({
    page,
    pageSize: PAGE_SIZE,
    sort,
    q: filterQuery,
  })
  const { facetCounts } = useFacetCounts()
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 sm:flex sm:gap-8 sm:py-8">
          <Sidebar>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">View mode</label>
                <ViewModeControl
                  type="asset-querier"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order by</label>
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filters</label>
                <FilterControl
                  facetCounts={facetCounts}
                  filters={filters}
                  onAdd={addFilter}
                  onClear={clearFilters}
                  onRemove={removeFilter}
                />
              </div>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {isPending ? (
              <Loader />
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
      <DocDetails
        doc={activeDoc}
        open={!!activeDoc}
        getFieldLink={(key, value) => {
          if (FILTER_TYPES.some((filterType) => filterType.key === key))
            return {
              pathname: '/asset-querier',
              search: `filter=${key}:${value}`,
            }
        }}
        onOpenChange={(open) => {
          if (!open) {
            setActiveDoc(undefined)
          }
        }}
      />
    </>
  )
}
