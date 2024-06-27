import { ReactNode } from 'react'

interface PageContentProps {
  children: ReactNode
}

export const PageContent = ({ children }: PageContentProps) => (
  <div className="w-full max-w-screen-xl px-8 mx-auto">{children}</div>
)
