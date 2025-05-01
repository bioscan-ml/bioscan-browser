import { DocDetailsDialog } from '@/components/doc-details/doc-details'
import { Error } from '@/components/error'
import { DnaGalleryItem } from '@/components/gallery/dna-gallery-item'
import { Gallery } from '@/components/gallery/gallery'
import { GalleryItem } from '@/components/gallery/gallery-item'
import { Loader } from '@/components/loader'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar, SidebarSection } from '@/components/sidebar'
import { Table } from '@/components/table'
import { TaxaSearch } from '@/components/taxa-search'
import { TaxonDetails } from '@/components/taxon-details'
import { TaxonomyTree as TaxonomyTreeComponent } from '@/components/taxonomy-tree'
import { Badge } from '@/components/ui/badge'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { usePagination } from '@/hooks/search-params/usePagination'
import { useSort } from '@/hooks/search-params/useSort'
import { useTaxon } from '@/hooks/search-params/useTaxon'
import { useRecords } from '@/hooks/useRecords'
import { useTaxonomyTree } from '@/hooks/useTaxonomyTree'
import {
  DEFAULT_PAGINATION,
  FIELDS,
  PATHS,
  ROOT_NODE_ID,
} from '@/lib/constants'
import { findPathById } from '@/lib/findPathById'
import { ViewMode } from '@/types/settings'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TaxonomyChart } from './taxonomy-chart'
import { useSelectedNode } from './useSelectedNode'

export const TaxonomyTree = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')

  // Taxonomy tree
  const { taxonomyTree, isPending: isTaxonomyTreePending } = useTaxonomyTree()
  const { selectedNodeId, setSelectedNodeId } = useTaxon(ROOT_NODE_ID)
  const defaultExpandedNodes = useMemo(() => {
    if (!taxonomyTree || !selectedNodeId) {
      return [ROOT_NODE_ID]
    }

    return findPathById(taxonomyTree.children, selectedNodeId)
  }, [selectedNodeId, taxonomyTree])

  // Records
  const { page, pageSize, setPage, setPageSize } =
    usePagination(DEFAULT_PAGINATION)
  const { sort, setSort } = useSort()
  const selectedNode = useSelectedNode(taxonomyTree, selectedNodeId)
  const q = selectedNode
    ? `${selectedNode.metadata.taxon}:"${selectedNode.metadata.label}"`
    : undefined
  const { data, isPending, error } = useRecords({
    page,
    pageSize,
    q,
    sort,
  })
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 md:flex md:gap-8 md:py-8">
          <Sidebar>
            <div className="space-y-8">
              <SidebarSection label="View mode">
                <ViewModeControl
                  type="taxonomy-tree"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SidebarSection>
              <SidebarSection label="Order by">
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </SidebarSection>
              <div className="space-y-2">
                <label className="text-sm font-medium md:w-64 md:sticky md:left-4">
                  Taxonomy
                </label>
                {isTaxonomyTreePending ? (
                  <Loader />
                ) : (
                  <TaxonomyTreeComponent
                    defaultExpandedNodes={defaultExpandedNodes}
                    selectedNodeId={selectedNodeId}
                    taxonomyTree={taxonomyTree}
                    onSelectedNodeIdChange={setSelectedNodeId}
                  />
                )}
              </div>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            {isPending || isTaxonomyTreePending ? (
              <Loader />
            ) : error ? (
              <Error />
            ) : (
              <>
                {selectedNode ? (
                  <div className="flex flex-col-reverse items-start justify-between gap-4 mb-4 pb-4 border-b lg:flex-row">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-semibold leading-none tracking-tight">
                        {selectedNode.metadata.label}
                      </h2>
                      <Badge variant="outline" className="uppercase">
                        {selectedNode.metadata.taxon}
                      </Badge>
                      <TaxonDetails
                        taxon={{
                          label: selectedNode.metadata.label,
                          rankLevel: selectedNode.metadata.taxon,
                        }}
                      />
                    </div>
                    <TaxaSearch
                      onTaxonSelect={(taxon) => {
                        navigate({
                          pathname: PATHS.TAXONOMY_TREE,
                          search: `taxon=${taxon.rank}-${taxon.name}`,
                        })
                      }}
                    />
                  </div>
                ) : null}
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
                {viewMode === 'chart' && (
                  <TaxonomyChart
                    docs={data?.docs}
                    selectedNode={selectedNode}
                    onBarClick={setSelectedNodeId}
                    onItemClick={(doc) => setActiveDoc(doc)}
                  />
                )}
                {viewMode === 'dna' && (
                  <div className="grid">
                    {data?.docs.map((doc) => (
                      <DnaGalleryItem
                        key={doc.id}
                        doc={doc}
                        onClick={() => setActiveDoc(doc)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </PageContent>
      {data?.docs ? (
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
