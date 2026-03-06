import { PageContent } from '@/components/page-content'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const Block = ({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) => (
  <div className={cn('py-32', className)} id={id}>
    <PageContent>{children}</PageContent>
  </div>
)
