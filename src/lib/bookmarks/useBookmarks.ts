import { useContext } from 'react'
import { BookmarksContext } from './context'

export const useBookmarks = () => useContext(BookmarksContext)
