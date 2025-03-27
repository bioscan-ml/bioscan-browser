import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

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
}) => {
  if (flags.external) {
    return (
      <a
        className={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'sm',
          }),
          'w-full justify-between',
        )}
        href={to}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
        <ExternalLinkIcon className="h-4 w-4 ml-3" />
      </a>
    )
  }

  return (
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
        <Badge className="ml-3" variant="outline">
          Experimental
        </Badge>
      ) : null}
    </NavLink>
  )
}
