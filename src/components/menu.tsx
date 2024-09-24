import { MAX_LG_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, buttonVariants } from './ui/button'
import { Popover, PopoverContent } from './ui/popover'

const MENU_ITEMS = [
  { to: '/taxonomy-viewer', label: 'Taxonomy viewer' },
  { to: '/asset-querier', label: 'Asset querier' },
  { to: '/search-similar', label: 'Search similar' },
  { to: '/about', label: 'About the dataset' },
]

export const Menu = () => {
  const isLargeScreen = useMediaQuery(MAX_LG_QUERY)

  return isLargeScreen ? <DesktopMenu /> : <MobileMenu />
}

const DesktopMenu = () => (
  <ul className="flex gap-4">
    {MENU_ITEMS.map((menuItem) => (
      <li key={menuItem.to}>
        <NavLink
          className={({ isActive }) =>
            buttonVariants({
              variant: isActive ? 'default' : 'ghost',
              size: 'sm',
            })
          }
          to={menuItem.to}
        >
          {menuItem.label}
        </NavLink>
      </li>
    ))}
  </ul>
)

const MobileMenu = () => {
  const [open, setIsOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-auto">
        <ul className="flex flex-col gap-2">
          {MENU_ITEMS.map((menuItem) => (
            <li key={menuItem.to}>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? 'default' : 'ghost',
                      size: 'sm',
                    }),
                    'w-full',
                  )
                }
                to={menuItem.to}
              >
                {menuItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
