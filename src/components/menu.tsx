import { NavLink } from 'react-router-dom'
import { buttonVariants } from './ui/button'

const MENU_ITEMS = [
  { to: '/taxonomy-viewer', label: 'Taxonomy viewer' },
  { to: '/asset-querier', label: 'Asset querier' },
  { to: '/about', label: 'About the dataset' },
]

export const Menu = () => (
  <nav>
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
  </nav>
)
