import { DocDetails } from '@/components/doc-details'
import { Gallery } from '@/components/gallery'
import { Loader } from '@/components/loader'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { Table } from '@/components/table'
import { TaxonomyTree } from '@/components/taxonomy-tree'
import { ViewModeControl } from '@/components/view-mode-control'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { usePage } from '@/hooks/search-params/usePage'
import { useSort } from '@/hooks/search-params/useSort'
import { useTaxon } from '@/hooks/search-params/useTaxon'
import { useRecords } from '@/hooks/useRecords'
import { useTaxonomyTree } from '@/hooks/useTaxonomyTree'
import {
  DEFAULT_PAGE,
  DEFAULT_SORT,
  FIELDS,
  FILTER_TYPES,
  PAGE_SIZE,
  ROOT_NODE_ID,
  TAXON_FILTER_TYPES,
} from '@/lib/constants'
import { findPathById } from '@/lib/findPathById'
import { ViewMode } from '@/types/settings'
import { useMemo, useState } from 'react'
import { TaxonomyChart } from './taxonomy-chart'
import { useSelectedNode } from './useSelectedNode'
import { Badge } from '@/components/ui/badge'

export const TaxonomyViewer = () => {
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
  const { page, setPage } = usePage(DEFAULT_PAGE)
  const { sort, setSort } = useSort(DEFAULT_SORT)
  const selectedNode = useSelectedNode(taxonomyTree, selectedNodeId)
  const q = selectedNode
    ? `${selectedNode.metadata.taxon}:"${selectedNode.metadata.label}"`
    : undefined
  const { data, isPending } = useRecords({ page, pageSize: PAGE_SIZE, sort, q })
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
                  type="taxonomy-viewer"
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order by</label>
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Taxonomy</label>
                {isTaxonomyTreePending ? (
                  <Loader />
                ) : (
                  <TaxonomyTree
                    defaultExpandedNodes={defaultExpandedNodes}
                    selectedNodeId={selectedNodeId}
                    taxonomyTree={taxonomyTree}
                    onSelectedNodeIdChange={setSelectedNodeId}
                  />
                )}
              </div>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {isPending ? (
              <Loader />
            ) : (
              <>
                {selectedNode ? (
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">
                      {selectedNode.metadata.label}
                    </h2>
                    <Badge variant="outline" className="uppercase">
                      {selectedNode.metadata.taxon}
                    </Badge>
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
                  <Gallery
                    docs={data?.docs}
                    onItemClick={(doc) => setActiveDoc(doc)}
                  />
                )}
                {viewMode === 'chart' && (
                  <TaxonomyChart
                    docs={data?.docs}
                    selectedNode={selectedNode}
                    onBarClick={setSelectedNodeId}
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
        getFieldLink={(key, value) => {
          if (TAXON_FILTER_TYPES.some((filterType) => filterType.key === key)) {
            return {
              pathname: '/taxonomy-viewer',
              search: `taxon=${key}-${value}`,
            }
          }

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
