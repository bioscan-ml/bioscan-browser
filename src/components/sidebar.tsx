import { ReactNode } from 'react'
import { ScrollArea } from './ui/scroll-area'

interface SidebarProps {
  children: ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => (
  <aside className="sticky top-24 w-64 h-[calc(100vh-12rem)] shrink-0 rounded-md border">
    <ScrollArea className="w-full h-full">
      <div className="p-4">{children}</div>
    </ScrollArea>
  </aside>
)
