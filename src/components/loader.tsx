import { cn } from '@/lib/utils'
import { LoaderCircleIcon } from 'lucide-react'

interface LoaderProps {
  className?: string
  size?: 'default' | 'sm'
}

export const Loader = ({ className, size = 'default' }: LoaderProps) => {
  const iconSize = {
    default: 16,
    sm: 12,
  }[size]

  return (
    <div
      className={cn('w-full h-32 flex items-center justify-center', className)}
    >
      <LoaderCircleIcon
        className={`w-${iconSize} h-${iconSize} animate-spin text-[#99cc33]`}
      />
    </div>
  )
}
