import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface PageContentProps {
  children: ReactNode
  className?: string
}

export const PageContent = ({ children, className }: PageContentProps) => (
  <div
    className={cn(
      'w-full h-full max-w-screen-2xl px-4 mx-auto sm:px-8',
      className,
    )}
  >
    {children}
  </div>
)
