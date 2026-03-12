import { DocDetailsDialog } from '@/components/doc-details/doc-details-dialog'
import { Error } from '@/components/error'
import { ActiveFilters } from '@/components/filters/active-filters'
import { Filters } from '@/components/filters/filters'
import { DnaBarcodeGalleryItem } from '@/components/gallery/dna-barcode-gallery-item'
import { Gallery } from '@/components/gallery/gallery'
import { GalleryItem } from '@/components/gallery/gallery-item'
import { Input } from '@/components/input'
import { Loader } from '@/components/loader'
import { NoRecordsFound } from '@/components/no-records-found'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { FallbackBar } from '@/components/pagination-bar/fallback-bar'
import { Sidebar, SidebarSection } from '@/components/sidebar'
import { Table } from '@/components/table'
import { TaxaSearch } from '@/components/taxa-search'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { useId } from '@/hooks/search-params/useId'
import { usePagination } from '@/hooks/search-params/usePagination'
import { useSort } from '@/hooks/search-params/useSort'
import { useFacetCounts } from '@/hooks/useFacetCounts'
import { useFilters } from '@/hooks/useFilters'
import { useRecords } from '@/hooks/useRecords'
import { DEFAULT_PAGINATION, FIELDS, PATHS } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { ViewMode } from '@/types/settings'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Search = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const { page, pageSize, setPage, setPageSize } =
    usePagination(DEFAULT_PAGINATION)
  const { sort, setSort } = useSort()
  const { id, setId } = useId()
  const { filters, addFilter, removeFilter, clearFilters } = useFilters()
  const { data, isPending, error } = useRecords({
    page,
    pageSize,
    q: filtersToQuery([
      ...filters,
      {
        key: 'id',
        values: id ? [id] : [],
      },
    ]),
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
                  type="search"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SidebarSection>
              <SidebarSection label="Order by">
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </SidebarSection>
              <SidebarSection label="Process ID">
                <Input
                  placeholder="Specify a process ID"
                  setValue={(value) => setId(value)}
                  value={id ?? ''}
                />
              </SidebarSection>
              <SidebarSection
                accessory={
                  <Filters
                    facetCounts={facetCounts}
                    filters={filters}
                    onAdd={addFilter}
                    onClear={clearFilters}
                    onRemove={removeFilter}
                  />
                }
                label="Filters"
              >
                {filters.length ? (
                  <ActiveFilters filters={filters} onRemove={removeFilter} />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No filters applied
                  </span>
                )}
              </SidebarSection>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            {isPending ? (
              <Loader />
            ) : error ? (
              <Error />
            ) : (
              <>
                <div className="flex flex-col-reverse items-start justify-between gap-4 mb-4 pb-4 border-b lg:flex-row">
                  <div className="h-10 flex items-center gap-4">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">
                      Search & filter
                    </h2>
                  </div>
                  <TaxaSearch
                    onTaxonSelect={(taxon) => {
                      navigate({
                        pathname: PATHS.SEARCH,
                        search: `${taxon.rank}=${taxon.name}`,
                      })
                    }}
                  />
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
                  <Gallery>
                    {data?.docs.map((doc) => (
                      <GalleryItem
                        key={doc.id}
                        doc={doc}
                        onClick={() => setActiveDoc(doc)}
                      />
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
                {data?.docs.length === 0 && (
                  <NoRecordsFound
                    onClearFilters={() => {
                      clearFilters()
                      setId(null)
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </PageContent>
      {error ? (
        <FallbackBar />
      ) : data?.docs ? (
        <PaginationBar
          data={data}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      ) : null}
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
