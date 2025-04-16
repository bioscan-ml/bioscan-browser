import { createContext } from 'react'
import { BookmarksContextValues } from './types'

export const BookmarksContext = createContext<BookmarksContextValues>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  removeBookmarks: () => {},
})
