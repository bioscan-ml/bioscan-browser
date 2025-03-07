import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Doc } from '@/types/response-data'
import { BookmarkIcon } from 'lucide-react'
import { useState } from 'react'
import colors from 'tailwindcss/colors'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface BookmarkControlProps {
  doc: Doc
}

export const BookmarkControl = ({ doc }: BookmarkControlProps) => {
  const [comment, setComment] = useState<string>()
  const [isBookmarked, setIsBookmarked] = useState(false)
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
                size="icon"
                variant="ghost"
                onClick={() => {
                  if (!isBookmarked) {
                    setIsBookmarked(true)
                    setIsNew(true)
                  }
                }}
              >
                <BookmarkIcon
                  className="w-4 h-4"
                  color={isBookmarked ? colors.emerald[500] : colors.gray[800]}
                  fill={isBookmarked ? colors.emerald[500] : colors.transparent}
                />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isBookmarked ? 'Edit bookmark' : 'Add bookmark'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent>
        <BookmarkForm
          defaultComment={comment}
          id={doc.id}
          isNew={isNew}
          onAdd={(comment) => {
            setIsBookmarked(true)
            setComment(comment)
            setIsOpen(false)
            setIsNew(false)
          }}
          onRemove={() => {
            setIsBookmarked(false)
            setComment(undefined)
            setIsOpen(false)
            setIsNew(false)
          }}
        />
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
