import { useBookmarks } from '@/lib/bookmarks/useBookmarks'
import { getImageSrc } from '@/lib/getImageSrc'
import { Doc } from '@/types/response-data'
import { ReactNode } from 'react'
import { BookmarkControl } from '../bookmark-control'

interface BookmarkGalleryItemProps {
  children?: ReactNode
  doc: Doc
  onClick: () => void
}

export const BookmarkGalleryItem = ({
  doc,
  onClick,
}: BookmarkGalleryItemProps) => {
  const { bookmarks } = useBookmarks()
  const bookmark = bookmarks.find((b) => b.recordId === doc.id)

  return (
    <div className="rounded-md border border-input bg-card overflow-hidden relative">
      <div className="h-full cursor-pointer hover:bg-muted" onClick={onClick}>
        <img
          alt={doc.id}
          className="w-full aspect-[341/256]"
          loading="lazy"
          src={getImageSrc(doc)}
        />
        <div className="p-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">{doc.id}</div>
            {bookmark?.comment?.length ? (
              <div className="text-xs italic">{bookmark.comment}</div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="m-2 absolute top-0 right-0">
        <BookmarkControl doc={doc} variant="outline" />
      </div>
    </div>
  )
}
