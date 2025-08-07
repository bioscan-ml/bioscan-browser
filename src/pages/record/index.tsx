import { DocDetails } from '@/components/doc-details/doc-details'
import { Error } from '@/components/error'
import { Loader } from '@/components/loader'
import { PageContent } from '@/components/page-content'
import { useRecord } from '@/hooks/useRecord'
import { useParams } from 'react-router-dom'

export const Record = () => {
  const { id } = useParams()
  const { data: doc, isPending, error } = useRecord({ id })

  return (
    <PageContent>
      <div className="max-w-screen-lg py-6 md:py-12">
        {isPending ? (
          <Loader />
        ) : error ? (
          <Error message="The record you are looking for does not exist or another error occured." />
        ) : doc ? (
          <div className="border bg-background p-6 rounded-md overflow-hidden">
            <DocDetails doc={doc} />
          </div>
        ) : null}
      </div>
    </PageContent>
  )
}
