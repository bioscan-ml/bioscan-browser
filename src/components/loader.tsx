import { Loader2Icon } from 'lucide-react'

interface LoaderProps {
  size?: 'default' | 'sm'
}

export const Loader = ({ size = 'default' }: LoaderProps) => {
  const containerSize = {
    default: 32,
    sm: 24,
  }[size]

  const iconSize = {
    default: 16,
    sm: 12,
  }[size]

  return (
    <div
      className={`w-full h-${containerSize} flex items-center justify-center`}
    >
      <Loader2Icon
        className={`w-${iconSize} h-${iconSize} animate-spin opacity-50`}
      />
    </div>
  )
}
