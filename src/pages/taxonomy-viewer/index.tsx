import { DocDetails } from '@/components/doc-details'
import { Gallery } from '@/components/gallery'
import { Loader } from '@/components/loader'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { TaxonomyTree } from '@/components/taxonomy-tree'
import { ViewModeControl } from '@/components/view-mode-control'
import { useRecords } from '@/hooks/useRecords'
import { useTaxonomyTree } from '@/hooks/useTaxonomyTree'
import { FIELDS, PAGE_SIZE, ROOT_NODE_ID } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Sort, ViewMode } from '@/types/settings'
import { useState } from 'react'
import { TaxonomyChart } from './taxonomy-chart'
import { useSelectedNode } from './useSelectedNode'

export const TaxonomyViewer = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')

  // Taxonomy tree
  const { taxonomyTree, isPending: isTaxonomyTreePending } = useTaxonomyTree()
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    ROOT_NODE_ID,
  )
  const selectedNode = useSelectedNode(taxonomyTree, selectedNodeId)

  // Records
  const [sort, setSort] = useState<Sort>({
    key: 'id',
    order: 'asc',
  })
  const [page, setPage] = useState(0)
  const q = selectedNode
    ? `${selectedNode.metadata.taxon}: ${selectedNode.metadata.label}`
    : undefined
  const { data, isPending } = useRecords({ page, pageSize: PAGE_SIZE, sort, q })
  const [activeDoc, setActiveDoc] = useState<Doc>()

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
                <label className="text-sm font-medium">Taxonomy</label>
                {isTaxonomyTreePending ? (
                  <Loader />
                ) : (
                  <TaxonomyTree
                    defaultExpandedNodes={[ROOT_NODE_ID]}
                    selectedNodeId={selectedNodeId}
                    taxonomyTree={taxonomyTree}
                    onSelectedNodeIdChange={setSelectedNodeId}
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order by</label>
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </div>
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {isPending ? (
              <Loader />
            ) : (
              <>
                {selectedNode ? (
                  <div className="space-y-1.5 mb-4 pb-4 border-b">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">
                      {selectedNode.metadata.label}
                    </h2>
                    <p className="text-sm text-muted-foreground uppercase">
                      {selectedNode.metadata.taxon}
                    </p>
                  </div>
                ) : null}
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
        onOpenChange={(open) => {
          if (!open) {
            setActiveDoc(undefined)
          }
        }}
      />
    </>
  )
}
