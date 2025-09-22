import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { MAX_MD_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { ChevronDownIcon, ChevronUpIcon, Settings2Icon } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface SidebarProps {
  avoidPaginationBar?: boolean
  children: ReactNode
}

export const Sidebar = ({
  avoidPaginationBar = true,
  children,
}: SidebarProps) => {
  const isLargeScreen = useMediaQuery(MAX_MD_QUERY, true)
  const SidebarComponent = isLargeScreen ? DesktopSidebar : MobileSidebar

  return (
    <SidebarComponent avoidPaginationBar={avoidPaginationBar}>
      {children}
    </SidebarComponent>
  )
}

export const SidebarSection = ({
  accessory,
  children,
  className,
  label,
}: {
  accessory?: ReactNode
  children: ReactNode
  className?: string
  label: string
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-2 md:w-64 md:sticky md:left-4',
        className,
      )}
    >
      <div className="h-10 flex items-center justify-between">
        <label className="py-1.5 text-sm leading-none font-medium">
          {label}
        </label>
        {accessory}
      </div>
      {children}
    </div>
  )
}

const DesktopSidebar = ({ avoidPaginationBar, children }: SidebarProps) => (
  <aside
    className={cn(
      'sticky top-24 w-72 h-[calc(100vh-8rem)] shrink-0 rounded-md bg-muted border',
      { 'h-[calc(100vh-12rem)]': avoidPaginationBar },
    )}
    style={{ boxSizing: 'content-box' }}
  >
    <div className="w-full h-full overflow-auto">
      <div className="w-min min-w-full p-4">{children}</div>
    </div>
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
