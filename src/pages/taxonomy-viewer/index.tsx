import { DocDetails } from '@/components/doc-details'
import { Gallery } from '@/components/gallery'
import { Loader } from '@/components/loader'
import { OrderByControl } from '@/components/order-by-control'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { TaxonomyTree } from '@/components/taxonomy-tree'
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
  PAGE_SIZE,
  ROOT_NODE_ID,
} from '@/lib/constants'
import { findPathById } from '@/lib/findPathById'
import { useMemo } from 'react'
import { useTaxonomyQuery } from './useTaxonomyQuery'

export const TaxonomyViewer = () => {
  // Taxonomy tree
  const { taxonomyTree, isPending: isTaxonomyTreePending } = useTaxonomyTree()
  const { selectedNodeId, setSelectedNodeId } = useTaxon(ROOT_NODE_ID)
  const defaultExpandedNodes = useMemo(() => {
    if (!taxonomyTree || !selectedNodeId) {
      return [ROOT_NODE_ID]
    }

    return findPathById(taxonomyTree.children, selectedNodeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxonomyTree])

  // Records
  const { page, setPage } = usePage(DEFAULT_PAGE)
  const { sort, setSort } = useSort(DEFAULT_SORT)
  const q = useTaxonomyQuery(taxonomyTree, selectedNodeId)
  const { data, isPending } = useRecords({ page, pageSize: PAGE_SIZE, sort, q })
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

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
