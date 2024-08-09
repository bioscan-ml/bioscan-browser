import { Button } from './ui/button'

interface NoRecordsFoundProps {
  onClearFilters?: () => void
}

export const NoRecordsFound = ({ onClearFilters }: NoRecordsFoundProps) => (
  <div className="text-center space-y-8 p-16">
    <div>
      <p className="text-xl font-medium mb-2">No records found</p>
      <p className="text-sm text-muted-foreground">
        The current filtering did not match any records.
      </p>
    </div>
    {onClearFilters && (
      <Button variant="outline" onClick={onClearFilters}>
        Clear filters
      </Button>
    )}
  </div>
)
