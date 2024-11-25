import { PageContent } from '../page-content'
import { PageSizeControl } from './page-size-control'
import { PaginationControls } from './pagination-controls'

interface PaginationBarProps<T> {
  data: {
    start: number
    numFound: number
    docs: T[]
  }
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export const PaginationBar = <T extends { id: string }>({
  data,
  page,
  pageSize,
  setPage,
  setPageSize,
}: PaginationBarProps<T>) => (
  <div className="fixed bottom-0 left-0 w-full h-16 bg-muted/95 border-t">
    <PageContent>
      <div className="h-full flex items-center justify-between gap-4">
        <PageSizeControl
          numFound={data.numFound}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        <PaginationControls
          numFound={data.numFound}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
        />
      </div>
    </PageContent>
  </div>
)
