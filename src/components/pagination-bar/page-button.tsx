import { Button } from '@/components/ui/button'

interface PageButtonProps {
  page: number
  active?: boolean
  onClick: () => void
}

export const PageButton = ({ page, active, onClick }: PageButtonProps) => {
  const pageLabel = (page + 1).toLocaleString()

  return (
    <Button variant={active ? 'secondary' : 'ghost'} onClick={onClick}>
      {pageLabel}
    </Button>
  )
}
