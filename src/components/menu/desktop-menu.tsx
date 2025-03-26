import { PopoverTrigger } from '@radix-ui/react-popover'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Popover, PopoverContent } from '../ui/popover'
import { MENU_ITEMS } from './constants'
import { MenuNavItem } from './menu-nav-item'
import { Flags } from './types'

export const DesktopMenu = () => (
  <ul className="flex gap-4">
    {MENU_ITEMS.map((menuItem) => (
      <li key={menuItem.id}>
        {menuItem.children ? (
          <DropdownMenu children={menuItem.children} label={menuItem.label} />
        ) : (
          <MenuNavItem
            flags={menuItem.flags}
            label={menuItem.label}
            to={menuItem.to as string}
          />
        )}
      </li>
    ))}
  </ul>
)

const DropdownMenu = ({
  children,
  label,
}: {
  children: { flags?: Flags; id: string; label: string; to: string }[]
  label: string
}) => {
  const location = useLocation()
  const [open, setIsOpen] = useState(false)
  const isActive = children.some((child) =>
    matchPath(child.to, location.pathname),
  )

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant={isActive ? 'default' : 'ghost'}>
          {label}
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-auto">
        <ul className="grid gap-2">
          {children.map((child) => (
            <li key={child.id}>
              <MenuNavItem
                flags={child.flags}
                label={child.label}
                onClick={() => setIsOpen(false)}
                to={child.to}
              />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
