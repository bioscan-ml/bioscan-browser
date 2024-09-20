import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { MAX_MD_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { ChevronDownIcon, ChevronUpIcon, Settings2Icon } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'

interface SidebarProps {
  children: ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  const isLargeScreen = useMediaQuery(MAX_MD_QUERY, true)
  const SidebarComponent = isLargeScreen ? DesktopSidebar : MobileSidebar

  return <SidebarComponent>{children}</SidebarComponent>
}

const DesktopSidebar = ({ children }: SidebarProps) => (
  <aside className="sticky top-24 w-64 h-[calc(100vh-12rem)] shrink-0 rounded-md border">
    <ScrollArea className="w-full h-full">
      <div className="w-[calc(100%-2rem)] py-4 mx-auto">{children}</div>
    </ScrollArea>
  </aside>
)

const MobileSidebar = ({ children }: SidebarProps) => {
  const [open, setIsOpen] = useState(false)
  const ChevronIcon = open ? ChevronUpIcon : ChevronDownIcon

  return (
    <Collapsible
      open={open}
      onOpenChange={setIsOpen}
      className="rounded-md border overflow-hidden"
    >
      <CollapsibleTrigger
        className={cn(
          'w-full h-10 flex items-center justify-start',
          open ? 'bg-muted' : undefined,
        )}
      >
        <Settings2Icon className="w-4 h-4 m-3" />
        <span className="text-sm font-medium grow text-left">Settings</span>
        <ChevronIcon className="w-4 h-4 m-3" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border-t">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
