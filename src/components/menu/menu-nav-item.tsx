import { cn } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'

export const MenuNavItem = ({
  flags = {},
  label,
  onClick,
  to,
}: {
  flags?: {
    experimental?: boolean
    external?: boolean
  }
  label: string
  onClick?: () => void
  to: string
}) => (
  <NavLink
    className={({ isActive }) =>
      cn(
        buttonVariants({
          variant: isActive ? 'default' : 'ghost',
          size: 'sm',
        }),
        'w-full justify-between',
      )
    }
    onClick={onClick}
    to={to}
  >
    {label}
    {flags.experimental ? (
      <Badge className="ml-4" variant="outline">
        Experimental
      </Badge>
    ) : null}
    {flags.external ? <ExternalLinkIcon className="w-4 h-4 ml-4" /> : null}
  </NavLink>
)
