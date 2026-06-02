import { cn } from '@/lib/cn'
import { LoaderCircleIcon } from 'lucide-react'

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => (
  <div
    className={cn('w-full h-32 flex items-center justify-center', className)}
  >
    <LoaderCircleIcon className={`w-16 h-16 animate-spin text-sky-500`} />
  </div>
)
