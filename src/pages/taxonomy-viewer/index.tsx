import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import { TaxonomyTree } from '@/components/taxonomy-tree'
import { useData } from '@/hooks/useData'
import { useTaxonomy } from '@/hooks/useTaxonomy'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { DataGallery } from '../asset-querier/data-gallery'
import { PAGE_SIZE, ROOT_NODE_ID } from './constants'
import { useTaxonomyQuery } from './useTaxonomyQuery'

export const TaxonomyViewer = () => {
  // Taxonomy
  const { taxonomy } = useTaxonomy()
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    ROOT_NODE_ID,
  )

  // Records
  const [page, setPage] = useState(0)
  const q = useTaxonomyQuery(taxonomy, selectedNodeId)
  const { data, isPending } = useData({ page, pageSize: PAGE_SIZE, q })

  return (
    <>
      <PageContent>
        <div className="flex items-start gap-12 mb-16 py-12">
          <aside className="sticky top-20 w-[240px] shrink-0 space-y-8">
            {taxonomy && (
              <TaxonomyTree
                defaultExpandedNodes={[ROOT_NODE_ID]}
                taxonomy={taxonomy}
                selectedNodeId={selectedNodeId}
                onSelectedNodeIdChange={setSelectedNodeId}
              />
            )}
          </aside>
          {isPending ? (
            <div className="w-full flex items-center justify-center">
              <Loader2Icon className="w-16 h-16 animate-spin opacity-50" />
            </div>
          ) : (
            <DataGallery docs={data?.docs} onItemClick={() => {}} />
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
