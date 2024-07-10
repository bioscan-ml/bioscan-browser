import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import { getPageWindow } from '../../lib/getPageWindow'
import { Button } from '../ui/button'
import { PageButton } from './page-button'

interface PaginationControlsProps {
  currentPage: number
  numFound: number
  pageSize: number
  setPage: (page: number) => void
}

export const PaginationControls = ({
  currentPage,
  numFound,
  pageSize,
  setPage,
}: PaginationControlsProps) => {
  const numPages = Math.ceil(numFound / pageSize)
  const firstPage = 0
  const lastPage = numPages - 1
  const pageWindow = getPageWindow(currentPage, numPages)
  const showStartDivider = pageWindow[0] - firstPage > 1
  const showEndDivider = lastPage - pageWindow[pageWindow.length - 1] > 1

  return (
    <div className="flex items-center gap-2">
      <Button
        aria-label="Previous"
        variant="ghost"
        size="icon"
        disabled={currentPage <= firstPage}
        onClick={() => setPage(currentPage - 1)}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <div className="hidden gap-2 sm:flex sm:items-center sm:gap-2">
        {!pageWindow.includes(firstPage) && (
          <PageButton
            page={firstPage}
            active={firstPage === currentPage}
            onClick={() => setPage(firstPage)}
          />
        )}
        {showStartDivider && <MoreHorizontalIcon className="w-4 h-4" />}
        {pageWindow.map((page) => (
          <PageButton
            key={page}
            page={page}
            active={page === currentPage}
            onClick={() => setPage(page)}
          />
        ))}
        {showEndDivider && <MoreHorizontalIcon className="w-4 h-4" />}
        {!pageWindow.includes(lastPage) && (
          <PageButton
            page={lastPage}
            active={lastPage === currentPage}
            onClick={() => setPage(lastPage)}
          />
        )}
      </div>
      <Button
        aria-label="Next"
        variant="ghost"
        size="icon"
        disabled={currentPage >= lastPage}
        onClick={() => setPage(currentPage + 1)}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}
