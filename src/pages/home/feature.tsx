import { ComponentType, ReactNode } from 'react'

export const Feature = ({
  Icon,
  title,
  children,
}: {
  Icon: ComponentType<{ className?: string }>
  title: string
  children: ReactNode
}) => (
  <div>
    <div className="flex items-center gap-4 mb-4 text-accent">
      <Icon className="w-8 h-8" />
      <h2>{title}</h2>
    </div>
    <p className="text-muted-foreground">{children}</p>
  </div>
)
