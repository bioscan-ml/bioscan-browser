import { ReactNode } from 'react'

interface GalleryProps {
  children: ReactNode
}

export const Gallery = ({ children }: GalleryProps) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
    {children}
  </div>
)
