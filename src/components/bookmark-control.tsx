import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useBookmarks } from '@/lib/bookmarks/useBookmarks'
import { Doc } from '@/types/response-data'
import { BookmarkIcon } from 'lucide-react'
import { useState } from 'react'
import colors from 'tailwindcss/colors'

interface BookmarkControlProps {
  doc: Doc
  variant?: 'ghost' | 'outline'
}

export const BookmarkControl = ({
  doc,
  variant = 'ghost',
}: BookmarkControlProps) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()
  const bookmark = bookmarks.find((b) => b.recordId === doc.id)
  const [isNew, setIsNew] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)

        if (!open) {
          setIsNew(false)
        }
      }}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                onClick={() => {
                  if (!bookmark) {
                    addBookmark({ recordId: doc.id })
                    setIsNew(true)
                  }
                }}
                size="icon"
                variant={variant}
              >
                <BookmarkIcon
                  className="w-4 h-4"
                  color={bookmark ? colors.emerald[500] : colors.gray[800]}
                  fill={bookmark ? colors.emerald[500] : colors.transparent}
                />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{bookmark ? 'Edit bookmark' : 'Add bookmark'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent>
        {bookmark ? (
          <BookmarkForm
            defaultComment={bookmark.comment}
            id={doc.id}
            isNew={isNew}
            onAdd={(comment) => {
              addBookmark({
                recordId: doc.id,
                comment,
              })
              setIsOpen(false)
              setIsNew(false)
            }}
            onRemove={() => {
              removeBookmark(doc.id)
              setIsOpen(false)
              setIsNew(false)
            }}
          />
        ) : null}
      </PopoverContent>
    </Popover>
  )
}

const BookmarkForm = ({
  defaultComment,
  id,
  isNew,
  onAdd,
  onRemove,
}: {
  defaultComment?: string
  id: string
  isNew: boolean
  onAdd: (comment: string) => void
  onRemove: () => void
}) => {
  const [comment, setComment] = useState(defaultComment ?? '')

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        onAdd(comment)
      }}
    >
      <h4>{isNew ? 'Bookmark added' : 'Edit bookmark'}</h4>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Record</label>
        <span className="text-sm">{id}</span>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Comment</label>
        <Input
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            onRemove()
          }}
        >
          Remove
        </Button>
        <Button type="submit" variant="default">
          Done
        </Button>
      </div>
    </form>
  )
}
