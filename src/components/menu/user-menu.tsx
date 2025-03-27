import { Button } from '@/components/ui/button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { UserIcon } from 'lucide-react'
import { useState } from 'react'
import { USER_MENU_ITEMS } from './constants'
import { MenuNavItem } from './menu-nav-item'

export const UserMenu = () => {
  const [open, setIsOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="shrink-0" size="icon" variant="ghost">
          <UserIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-auto">
        <ul className="grid gap-2">
          {USER_MENU_ITEMS.map((menuItem) => (
            <li key={menuItem.id}>
              <MenuNavItem
                label={menuItem.label}
                onClick={() => setIsOpen(false)}
                to={menuItem.to}
              />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
