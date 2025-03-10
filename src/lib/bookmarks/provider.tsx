import { ReactNode, useState } from 'react'
import { BookmarksContext } from './context'
import { Bookmark } from './types'

const STORAGE_KEY_BOOKMARKS = 'bookmarks'
const VERSION = 'v1.0'

const getStoredBookmarks = (): Bookmark[] => {
  const value = localStorage.getItem(STORAGE_KEY_BOOKMARKS)

  try {
    const stored = value ? JSON.parse(value) : undefined

    if (stored && stored.version !== VERSION) {
      throw Error()
    }

    return stored?.bookmarks ?? []
  } catch {
    localStorage.removeItem(STORAGE_KEY_BOOKMARKS)
    return []
  }
}

const storeBookmarks = (bookmarks: Bookmark[]) =>
  localStorage.setItem(
    STORAGE_KEY_BOOKMARKS,
    JSON.stringify({ bookmarks, version: VERSION }),
  )

const clearStoredBookmarks = () =>
  localStorage.removeItem(STORAGE_KEY_BOOKMARKS)

export const BookmarksContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [bookmarks, setBookmarks] = useState(getStoredBookmarks())

  const addBookmark = (bookmark: Bookmark) => {
    const updatedBookmarks = [
      ...bookmarks.filter((b) => b.recordId !== bookmark.recordId),
      bookmark,
    ]
    storeBookmarks(updatedBookmarks)
    setBookmarks(getStoredBookmarks())
  }

  const removeBookmark = (recordId: string) => {
    const updatedBookmarks = bookmarks.filter((b) => b.recordId !== recordId)
    storeBookmarks(updatedBookmarks)
    setBookmarks(getStoredBookmarks())
  }

  const removeBookmarks = () => {
    clearStoredBookmarks()
    setBookmarks(getStoredBookmarks())
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        removeBookmarks,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}
