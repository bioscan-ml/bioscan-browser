import { buttonVariants } from '@/components/ui/button'
import { PATHS } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Link } from 'react-router-dom'

interface ReportInfoProps {
  doc: Doc
}

export const ReportInfo = ({ doc }: ReportInfoProps) => (
  <div className="flex flex-col items-center gap-4 py-8 text-center">
    <p className="text-sm text-muted-foreground">
      Do you see a problem with this record or want to suggest an update?
    </p>
    <Link
      to={`${PATHS.REPORT}?id=${doc.id}`}
      className={buttonVariants({ variant: 'outline' })}
    >
      Submit a report
    </Link>
  </div>
)
