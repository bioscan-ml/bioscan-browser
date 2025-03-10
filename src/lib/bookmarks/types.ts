export interface Bookmark {
  recordId: string
  comment?: string
}

export interface BookmarksContextValues {
  bookmarks: Bookmark[]
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (recordId: string) => void
  removeBookmarks: () => void
}
