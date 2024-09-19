import {
  BrainCircuitIcon,
  FilterIcon,
  InfoIcon,
  NetworkIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { buttonVariants } from './ui/button'

const MENU_ITEMS = [
  { to: '/taxonomy-viewer', label: 'Taxonomy viewer', icon: NetworkIcon },
  { to: '/asset-querier', label: 'Asset querier', icon: FilterIcon },
  { to: '/vector-search', label: 'Vector search', icon: BrainCircuitIcon },
  { to: '/about', label: 'About the dataset', icon: InfoIcon },
]

export const Menu = () => (
  <nav>
    <ul className="hidden gap-4 sm:flex">
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
    <ul className="flex gap-2 sm:hidden">
      {MENU_ITEMS.map((menuItem) => (
        <li key={menuItem.to}>
          <NavLink
            className={({ isActive }) =>
              buttonVariants({
                variant: isActive ? 'default' : 'ghost',
                size: 'icon',
              })
            }
            to={menuItem.to}
          >
            <menuItem.icon className="w-4 h-4" />
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
)
