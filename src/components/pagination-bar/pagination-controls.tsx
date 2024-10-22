import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import { useEffect } from 'react'
import { getPageWindow } from '../../lib/getPageWindow'
import { Button } from '../ui/button'
import { PageButton } from './page-button'

interface PaginationControlsProps {
  numFound: number
  page: number
  pageSize: number
  setPage: (page: number) => void
}

export const PaginationControls = ({
  numFound,
  page,
  pageSize,
  setPage,
}: PaginationControlsProps) => {
  const numPages = Math.max(Math.ceil(numFound / pageSize), 1)
  const firstPage = 0
  const lastPage = numPages - 1
  const pageWindow = getPageWindow(page, numPages)
  const showStartDivider = pageWindow[0] - firstPage > 1
  const showEndDivider = lastPage - pageWindow[pageWindow.length - 1] > 1

  useEffect(() => {
    if (page >= numPages) {
      setPage(firstPage)
    }
  }, [page, numPages, setPage])

  return (
    <div className="flex items-center gap-2">
      <Button
        aria-label="Previous"
        variant="ghost"
        size="icon"
        disabled={page <= firstPage}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <div className="hidden gap-2 sm:flex sm:items-center sm:gap-2">
        {!pageWindow.includes(firstPage) && (
          <PageButton
            page={firstPage}
            active={firstPage === page}
            onClick={() => setPage(firstPage)}
          />
        )}
        {showStartDivider && <MoreHorizontalIcon className="w-4 h-4" />}
        {pageWindow.map((_page) => (
          <PageButton
            key={_page}
            page={_page}
            active={_page === page}
            onClick={() => setPage(_page)}
          />
        ))}
        {showEndDivider && <MoreHorizontalIcon className="w-4 h-4" />}
        {!pageWindow.includes(lastPage) && (
          <PageButton
            page={lastPage}
            active={lastPage === page}
            onClick={() => setPage(lastPage)}
          />
        )}
      </div>
      <Button
        aria-label="Next"
        variant="ghost"
        size="icon"
        disabled={page >= lastPage}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}
