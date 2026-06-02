import { PageContent } from '@/components/page-content'
import { cn } from '@/lib/cn'
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
  <div className={cn('py-8 md:py-32', className)} id={id}>
    <PageContent className="max-w-screen-xl">{children}</PageContent>
  </div>
)
