import { LoaderCircleIcon } from 'lucide-react'

interface LoaderProps {
  size?: 'default' | 'sm'
}

export const Loader = ({ size = 'default' }: LoaderProps) => {
  const iconSize = {
    default: 16,
    sm: 12,
  }[size]

  return (
    <div className={`w-full h-32 flex items-center justify-center`}>
      <LoaderCircleIcon
        className={`w-${iconSize} h-${iconSize} animate-spin text-[#99cc33]`}
      />
    </div>
  )
}
