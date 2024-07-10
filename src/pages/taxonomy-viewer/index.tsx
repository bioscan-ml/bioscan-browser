import { DocDetails } from '@/components/doc-details'
import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { Sidebar } from '@/components/sidebar'
import { TaxonomyTree } from '@/components/taxonomy-tree'
import { useRecords } from '@/hooks/useRecords'
import { useTaxonomyTree } from '@/hooks/useTaxonomyTree'
import { Doc } from '@/types/response-data'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { DataGallery } from '../asset-querier/data-gallery'
import { PAGE_SIZE, ROOT_NODE_ID } from './constants'
import { useTaxonomyQuery } from './useTaxonomyQuery'

export const TaxonomyViewer = () => {
  // Taxonomy tree
  const { taxonomyTree, isPending: taxonomyTreePending } = useTaxonomyTree()
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    ROOT_NODE_ID,
  )

  // Records
  const [page, setPage] = useState(0)
  const q = useTaxonomyQuery(taxonomyTree, selectedNodeId)
  const { data, isPending } = useRecords({ page, pageSize: PAGE_SIZE, q })
  const [activeDoc, setActiveDoc] = useState<Doc>()

  return (
    <>
      <PageContent>
        <div className="flex items-start gap-8 py-8">
          <Sidebar>
            {taxonomyTree && (
              <TaxonomyTree
                defaultExpandedNodes={[ROOT_NODE_ID]}
                selectedNodeId={selectedNodeId}
                taxonomyTree={taxonomyTree}
                onSelectedNodeIdChange={setSelectedNodeId}
              />
            )}
          </Sidebar>
          <div className="mb-16 grow overflow-hidden">
            {taxonomyTreePending || isPending ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2Icon className="w-16 h-16 animate-spin opacity-50" />
              </div>
            ) : (
              <DataGallery
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
