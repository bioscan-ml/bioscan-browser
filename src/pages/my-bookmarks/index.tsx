import { DocDetailsDialog } from '@/components/doc-details/doc-details-dialog'
import { Error } from '@/components/error'
import { BookmarkGalleryItem } from '@/components/gallery/bookmark-gallery-item'
import { Loader } from '@/components/loader'
import { NoRecordsFound } from '@/components/no-records-found'
import { PageContent } from '@/components/page-content'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { useRecords } from '@/hooks/useRecords'
import { useBookmarks } from '@/lib/bookmarks/useBookmarks'
import { DEFAULT_PAGINATION } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'
import { InfoIcon } from 'lucide-react'
import { useMemo } from 'react'

export const MyBookmarks = () => {
  const { bookmarks } = useBookmarks()
  const { data, isLoading, error } = useRecords(
    {
      ...DEFAULT_PAGINATION,
      q: filtersToQuery([
        {
          key: 'id',
          values: bookmarks.map((bookmark) => bookmark.recordId).sort(),
        },
      ]),
    },
    bookmarks.length > 0,
  )
  const docs = useMemo(() => {
    if (!data?.docs) {
      return undefined
    }

    return data.docs.sort((doc1, doc2) => {
      const timestamp1 = bookmarks.find(
        (bookmark) => bookmark.recordId === doc1.id,
      )?.timestamp
      const timestamp2 = bookmarks.find(
        (bookmark) => bookmark.recordId === doc2.id,
      )?.timestamp

      if (!timestamp1 || !timestamp2) {
        return 0
      }

      return new Date(timestamp1).getTime() - new Date(timestamp2).getTime()
    })
  }, [data, bookmarks])

  const { activeDoc, setActiveDoc } = useActiveDoc(docs)

  return (
    <>
      <PageContent>
        <div className="grid items-start gap-4 py-4 md:flex md:gap-8 md:py-8">
          <div className="mb-16 grow overflow-hidden m-[-4px] p-[4px]">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Error />
            ) : (
              <>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">
                    My bookmarks
                  </h2>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <InfoIcon className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        className="w-72 text-center"
                        side="bottom"
                      >
                        <p>
                          If you see an interesting record, you can bookmark it
                          with a comment and find it again later. Bookmarks are
                          stored in your browser and will disappear if you clear
                          your browser data.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {docs?.map((doc) => (
                    <BookmarkGalleryItem
                      key={doc.id}
                      doc={doc}
                      onClick={() => setActiveDoc(doc)}
                    />
                  ))}
                </div>

                {bookmarks.length === 0 || data?.docs.length === 0 ? (
                  <NoRecordsFound description="You have not added any bookmarks yet." />
                ) : null}
              </>
            )}
          </div>
        </div>
      </PageContent>
      <DocDetailsDialog
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
