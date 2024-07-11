import { DocDetails } from '@/components/doc-details'
import { Gallery } from '@/components/gallery'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { TaxonomyTree } from '@/components/taxonomy-tree'
import { useRecords } from '@/hooks/useRecords'
import { useTaxonomyTree } from '@/hooks/useTaxonomyTree'
import { FIELDS, PAGE_SIZE, ROOT_NODE_ID } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useTaxonomyQuery } from './useTaxonomyQuery'

export const TaxonomyViewer = () => {
  // Taxonomy tree
  const { taxonomyTree, isPending: taxonomyTreePending } = useTaxonomyTree()
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    ROOT_NODE_ID,
  )

  // Records
  const [sort, setSort] = useState<Sort>({
    key: 'id',
    order: 'asc',
  })
  const [page, setPage] = useState(0)
  const q = useTaxonomyQuery(taxonomyTree, selectedNodeId)
  const { data, isPending } = useRecords({ page, pageSize: PAGE_SIZE, sort, q })
  const [activeDoc, setActiveDoc] = useState<Doc>()

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 sm:flex sm:gap-8 sm:py-8">
          <Sidebar>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">Order by</label>
                <OrderByControl fields={FIELDS} sort={sort} setSort={setSort} />
              </div>
              {taxonomyTree && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Taxonomy</label>
                  <TaxonomyTree
                    defaultExpandedNodes={[ROOT_NODE_ID]}
                    selectedNodeId={selectedNodeId}
                    taxonomyTree={taxonomyTree}
                    onSelectedNodeIdChange={setSelectedNodeId}
                  />
                </div>
              )}
            </div>
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {taxonomyTreePending || isPending ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2Icon className="w-16 h-16 animate-spin opacity-50" />
              </div>
            ) : (
              <Gallery
                docs={data?.docs}
                onItemClick={(doc) => setActiveDoc(doc)}
              />
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
