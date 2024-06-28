import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { PageContent } from './page-content'
import { Button } from './ui/button'

interface PaginationBarProps<T> {
  data?: {
    start: number
    numFound: number
    docs: T[]
  }
  isPending?: boolean
  page: number
  setPage: (page: number) => void
}

export const PaginationBar = <T extends { id: string }>({
  page,
  setPage,
  data,
  isPending,
}: PaginationBarProps<T>) => {
  const prevDisabled = !data || page < 1
  const nextDisabled = !data // TODO: Update

  return (
    <div className="fixed bottom-0 left-0 w-full bg-muted/95 border-t">
      <PageContent>
        <div className="h-12 flex items-center justify-between">
          {isPending || !data ? (
            <p>Loading...</p>
          ) : (
            <p className="text-sm">
              Showing {data.start + 1}-{data.start + data.docs.length} of{' '}
              {data.numFound} results
            </p>
          )}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setPage(page - 1)}
              disabled={prevDisabled}
            >
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="ghost"
              onClick={() => setPage(page + 1)}
              disabled={nextDisabled}
            >
              Next
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </PageContent>
    </div>
  )
}
