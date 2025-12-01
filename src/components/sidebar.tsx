import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { MAX_MD_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { ChevronsUpDownIcon, Settings2Icon } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { buttonVariants } from './ui/button'

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
  children,
  className,
  label,
}: {
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
      <label className="py-1.5 text-sm leading-none font-medium">{label}</label>
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

  return (
    <Collapsible open={open} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(buttonVariants({ variant: 'outline' }), 'w-full', {
          'rounded-b-none': open,
        })}
      >
        <Settings2Icon className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium grow text-left">Settings</span>
        <ChevronsUpDownIcon className="w-4 h-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border-x border-b rounded-b-md">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
