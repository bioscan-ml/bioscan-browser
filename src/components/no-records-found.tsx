import { Button } from './ui/button'

interface NoRecordsFoundProps {
  description?: string
  onClearFilters?: () => void
  title?: string
}

export const NoRecordsFound = ({
  description = 'The current filtering did not match any records.',
  onClearFilters,
  title = 'No records found',
}: NoRecordsFoundProps) => (
  <div className="text-center space-y-8 p-16">
    <div>
      <p className="text-xl font-medium mb-2">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {onClearFilters && (
      <Button variant="outline" onClick={onClearFilters}>
        Clear filters
      </Button>
    )}
  </div>
)
