import { Button } from '@/components/ui/button'
import { useChatMessages } from '@/hooks/chatbot/useChatMessages'
import { PATHS } from '@/lib/constants'
import { MessageCircleIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatPanel } from './chat-panel'

const DEFAULT_SIZE = { width: 352, height: 512 } // 22rem x 32rem
const MIN_SIZE = { width: 280, height: 320 }
const VIEWPORT_MARGIN = { width: 32, height: 96 }

// Site-wide floating chat bubble. Hidden on the dedicated /chatbot page so
// there's only ever one chat entry point visible at a time; both share the
// same sessionStorage-backed conversation via useChatMessages.
export const FloatingChat = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const { messages, input, setInput, submit, isPending } = useChatMessages()
  const { size, onResizeHandleMouseDown } = useResizablePanel(DEFAULT_SIZE)

  if (pathname === PATHS.CHATBOT) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div
          className="relative flex max-h-[calc(100vh-6rem)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border bg-muted shadow-xl"
          style={{ width: size.width, height: size.height }}
        >
          {/* Panel is anchored to the bottom-right corner of the screen, so
              resizing happens from the opposite (top-left) corner. */}
          <div
            aria-label="Resize chat window"
            className="absolute left-0 top-0 z-10 h-4 w-4 cursor-nwse-resize touch-none"
            onMouseDown={onResizeHandleMouseDown}
            role="separator"
          />
          <div className="flex items-center justify-between border-b bg-background px-4 py-3">
            <span className="text-sm font-medium">Chatbot</span>
            <Button
              aria-label="Close chat"
              className="h-7 w-7"
              onClick={() => setOpen(false)}
              size="icon"
              variant="ghost"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <ChatPanel
            input={input}
            isPending={isPending}
            messages={messages}
            onInputChange={setInput}
            onSubmit={submit}
          />
        </div>
      ) : null}
      <Button
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={() => setOpen((prev) => !prev)}
        size="icon"
      >
        {open ? (
          <XIcon className="h-5 w-5" />
        ) : (
          <MessageCircleIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}

// Drag-to-resize from a corner that stays put while the opposite corner
// (top-left here, since the panel is anchored bottom-right) follows the
// mouse. Size is clamped to a sane minimum and to the viewport.
const useResizablePanel = (defaultSize: { width: number; height: number }) => {
  const [size, setSize] = useState(defaultSize)
  const dragState = useRef<{
    startX: number
    startY: number
    startWidth: number
    startHeight: number
  } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.current) return
      const { startX, startY, startWidth, startHeight } = dragState.current

      const maxWidth = window.innerWidth - VIEWPORT_MARGIN.width
      const maxHeight = window.innerHeight - VIEWPORT_MARGIN.height

      setSize({
        width: clamp(
          startWidth + (startX - e.clientX),
          MIN_SIZE.width,
          maxWidth,
        ),
        height: clamp(
          startHeight + (startY - e.clientY),
          MIN_SIZE.height,
          maxHeight,
        ),
      })
    }

    const stopDragging = () => {
      if (!dragState.current) return
      dragState.current = null
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', stopDragging)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopDragging)
    }
  }, [])

  const onResizeHandleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    }
    document.body.style.cursor = 'nwse-resize'
    document.body.style.userSelect = 'none'
  }

  return { size, onResizeHandleMouseDown }
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max))
