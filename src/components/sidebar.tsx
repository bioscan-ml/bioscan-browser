import { ReactNode } from 'react'
import { ScrollArea } from './ui/scroll-area'

interface SidebarProps {
  children: ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => (
  <aside className="w-full rounded-md border sm:sticky sm:top-24 sm:w-64 sm:h-[calc(100vh-12rem)] sm:shrink-0">
    <ScrollArea className="w-full h-full">
      <div className="w-[calc(100%-2rem)] py-4 mx-auto">{children}</div>
    </ScrollArea>
  </aside>
)
