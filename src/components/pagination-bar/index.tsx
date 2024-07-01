import { PageContent } from '../page-content'
import { PaginationControls } from './pagination-controls'

interface PaginationBarProps<T> {
  currentPage: number
  data: {
    start: number
    numFound: number
    docs: T[]
  }
  pageSize: number
  setPage: (page: number) => void
}

export const PaginationBar = <T extends { id: string }>({
  currentPage,
  data,
  pageSize,
  setPage,
}: PaginationBarProps<T>) => {
  const fromLabel = (data.start + 1).toLocaleString()
  const toLabel = (data.start + data.docs.length).toLocaleString()
  const totalLabel = data.numFound.toLocaleString()

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background/95 border-t">
      <PageContent>
        <div className="h-16 flex items-center justify-between gap-2">
          <p className="text-sm whitespace-nowrap shrink-0">
            Showing {fromLabel}-{toLabel} of {totalLabel} results
          </p>
          <PaginationControls
            currentPage={currentPage}
            numFound={data.numFound}
            pageSize={pageSize}
            setPage={setPage}
          />
        </div>
      </PageContent>
    </div>
  )
}
