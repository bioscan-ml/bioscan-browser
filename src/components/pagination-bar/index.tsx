import { getPaginationLabel } from '@/lib/getPaginationLabel'
import { PageContent } from '../page-content'
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
}

export const PaginationBar = <T extends { id: string }>({
  data,
  page,
  pageSize,
  setPage,
}: PaginationBarProps<T>) => {
  const paginationLabel = getPaginationLabel(data)

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-background/95 border-t">
      <PageContent>
        <div className="h-full flex items-center justify-between gap-2">
          <p className="text-sm whitespace-nowrap shrink-0">
            {paginationLabel}
          </p>
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
}
