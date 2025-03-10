import { DocDetailsDialog } from '@/components/doc-details/doc-details'
import { Error } from '@/components/error'
import { BookmarkGalleryItem } from '@/components/gallery/bookmark-gallery-item'
import { Loader } from '@/components/loader'
import { NoRecordsFound } from '@/components/no-records-found'
import { PageContent } from '@/components/page-content'
import { useActiveDoc } from '@/hooks/search-params/useActiveDoc'
import { useRecords } from '@/hooks/useRecords'
import { useBookmarks } from '@/lib/bookmarks/useBookmarks'
import { DEFAULT_PAGINATION } from '@/lib/constants'
import { filtersToQuery } from '@/lib/filtersToQuery'

export const MyBookmarks = () => {
  const { bookmarks } = useBookmarks()
  const { data, isLoading, error } = useRecords(
    {
      ...DEFAULT_PAGINATION,
      q: filtersToQuery([
        {
          type: 'id',
          value: bookmarks.map((bookmark) => bookmark.recordId),
        },
      ]),
    },
    bookmarks.length > 0,
  )
  const { activeDoc, setActiveDoc } = useActiveDoc(data?.docs)

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
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {data?.docs.map((doc) => (
                    <BookmarkGalleryItem
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
