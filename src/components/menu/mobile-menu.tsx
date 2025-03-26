import { PopoverTrigger } from '@radix-ui/react-popover'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent } from '../ui/popover'
import { Separator } from '../ui/separator'
import { MENU_ITEMS } from './constants'
import { MenuNavItem } from './menu-nav-item'
import { Flags } from './types'

export const MobileMenu = () => {
  const [open, setIsOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-auto">
        <ul className="grid gap-2">
          {MENU_ITEMS.map((menuItem) => (
            <li key={menuItem.id}>
              {menuItem.children ? (
                <MenuSection
                  children={menuItem.children}
                  label={menuItem.label}
                  onMenuNavItemClick={() => setIsOpen(false)}
                />
              ) : (
                <MenuNavItem
                  flags={menuItem.flags}
                  label={menuItem.label}
                  onClick={() => setIsOpen(false)}
                  to={menuItem.to as string}
                />
              )}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

const MenuSection = ({
  children,
  label,
  onMenuNavItemClick,
}: {
  children: { flags?: Flags; id: string; label: string; to: string }[]
  label: string
  onMenuNavItemClick: () => void
}) => (
  <div className="grid gap-2">
    <Separator className="shrink-0 my-2" orientation="horizontal" />
    <span className="text-sm font-medium uppercase text-muted-foreground">
      {label}
    </span>
    <ul className="grid gap-2">
      {children.map((child) => (
        <li key={child.id}>
          <MenuNavItem
            flags={child.flags}
            label={child.label}
            onClick={onMenuNavItemClick}
            to={child.to}
          />
        </li>
      ))}
    </ul>
    <Separator className="shrink-0 my-2" orientation="horizontal" />
  </div>
)
