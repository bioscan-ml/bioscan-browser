export interface Bookmark {
  recordId: string
  comment?: string
  timestamp?: string
}

export interface BookmarksContextValues {
  bookmarks: Bookmark[]
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (recordId: string) => void
  removeBookmarks: () => void
}
