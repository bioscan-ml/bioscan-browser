import { CodeBlock } from '@/components/code-block'
import { Loader } from '@/components/loader'
import { PageContent } from '@/components/page-content'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { REPORT_TYPES } from '@/hooks/github/constants'
import { ReportFormData } from '@/hooks/github/types'
import { useCreateIssue } from '@/hooks/github/useCreateIssue'
import { useId } from '@/hooks/search-params/useId'
import { useRecord } from '@/hooks/useRecord'
import { getImageSrc } from '@/lib/getImageSrc'
import { cn } from '@/lib/utils'
import { Doc } from '@/types/response-data'
import { ExternalLinkIcon, Loader2Icon, SearchIcon } from 'lucide-react'
import { ReactNode, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required.',
  NOT_FOUND: 'Could not find record, please try again.',
  UNKNOWN: 'Could not submit the report, please try again.',
}

export const Report = () => {
  const { id, setId } = useId()
  const { createIssue, error, isPending, isSuccess, reset } = useCreateIssue()

  return (
    <PageContent>
      <article className="max-w-screen-md py-6 space-y-8 md:py-12 md:space-y-12">
        <div>
          <h1 className="text-accent mb-2">Report</h1>
          <h2>Report a problem or suggest updates to BIOSCAN-5M</h2>
        </div>
        {isSuccess ? (
          <AfterSubmit
            onNewReportClick={() => {
              setId(null)
              reset()
            }}
          />
        ) : (
          <ReportForm
            createIssue={createIssue}
            error={error}
            id={id}
            isPending={isPending}
            setId={setId}
          />
        )}
      </article>
    </PageContent>
  )
}

const AfterSubmit = ({
  onNewReportClick,
}: {
  onNewReportClick: () => void
}) => (
  <div className="p-8 rounded-sm bg-muted border md:p-12">
    <h3 className="text-accent mb-8">
      Thank you for helping us improve BIOSCAN-5M!
    </h3>
    <h4 className="mb-2">What happens now?</h4>
    <p className="text-muted-foreground mb-8">
      Your report has been submitted as a{' '}
      <a className="text-link" href="#">
        GitHub issue
      </a>{' '}
      and a dataset admin will now take a closer look at it. This can take a few
      days, weeks or even months. It all depends on our current availability,
      but also the report type. Reports related to the taxonomic label typically
      take longer time to resolve. If the report is approved, the update will be
      included with the next version of the dataset.
    </p>
    <h4 className="mb-2">How can I follow the report progress?</h4>
    <p className="text-muted-foreground mb-8">
      You can follow the report progress and related conversations on{' '}
      <a className="text-link" href="">
        GitHub
      </a>
      !
    </p>
    <div className="flex gap-2">
      <a className={buttonVariants()} href="#">
        Your report
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </a>
      <Button variant="outline" onClick={onNewReportClick}>
        New report
      </Button>
    </div>
  </div>
)

const ReportForm = ({
  createIssue,
  error,
  id,
  isPending,
  setId,
}: {
  createIssue: (data: { formData: ReportFormData; doc: Doc }) => void
  error: Error | null
  id: string | null
  isPending: boolean
  setId: (id: string | null) => void
}) => {
  const {
    data: doc,
    error: recordError,
    isPending: recordIsPending,
    refetch,
  } = useRecord(id?.length ? id : undefined)
  const { control, setValue, handleSubmit, reset } = useForm<ReportFormData>({
    defaultValues: { comments: '', id: '', type: '', name: '' },
  })

  useEffect(() => {
    setValue('id', id ?? '')
  }, [id, setValue])

  const onClear = () => {
    reset()
    setId(null)
  }

  return (
    <form
      className="p-8 space-y-8 rounded-sm bg-muted border md:p-12 md:space-y-12"
      onSubmit={handleSubmit((formData) => {
        if (doc) {
          createIssue({ formData, doc })
        }
      })}
    >
      <div className="space-y-8">
        <h3 className="text-accent">Record details</h3>
        <Controller
          control={control}
          name="id"
          rules={{ required: ERROR_MESSAGES.REQUIRED }}
          render={({ field, fieldState }) => (
            <FormField
              label="Record ID *"
              error={
                fieldState.error?.message
                  ? fieldState.error.message
                  : recordError
                    ? ERROR_MESSAGES.NOT_FOUND
                    : undefined
              }
            >
              <div className="flex gap-2">
                <Input {...field} placeholder="Specify a record ID" />
                <Button
                  className="shrink-0"
                  onClick={() => {
                    if (id === field.value) {
                      refetch()
                    } else {
                      setId(field.value ?? null)
                    }
                  }}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <SearchIcon className="w-4 h-4" />
                </Button>
              </div>
            </FormField>
          )}
        />
        {id && <RecordDetails doc={doc} isPending={recordIsPending} />}
      </div>
      <div className="space-y-8">
        <h3 className="text-accent mb-8">Report details</h3>
        <Controller
          control={control}
          name="type"
          rules={{ required: ERROR_MESSAGES.REQUIRED }}
          render={({ field, fieldState }) => (
            <FormField label="Report type *" error={fieldState.error?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger ref={field.ref}>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map(({ title }) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="comments"
          render={({ field, fieldState }) => (
            <FormField label="Comments" error={fieldState.error?.message}>
              <Textarea {...field} />
            </FormField>
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <FormField label="Your name" error={fieldState.error?.message}>
              <Input {...field} />
            </FormField>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-start gap-4">
          <Button size="lg" type="submit">
            Submit
            {isPending ? (
              <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />
            ) : null}
          </Button>
          <Button onClick={onClear} size="lg" variant="outline" type="reset">
            Clear
          </Button>
        </div>
        {error ? (
          <span className="text-xs text-destructive italic">
            {ERROR_MESSAGES.UNKNOWN}
          </span>
        ) : null}
      </div>
    </form>
  )
}

const RecordDetails = ({
  doc,
  isPending,
}: {
  doc?: Doc
  isPending: boolean
}) => {
  if (isPending) {
    return <Loader />
  }

  if (!doc) {
    return null
  }

  return (
    <>
      <FormField label="Images">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <img
              alt={doc.id}
              className="w-full aspect-[341/256] rounded-md border"
              loading="lazy"
              src={getImageSrc(doc, 'original_full')}
            />
            <Badge variant="outline" className="absolute bottom-2 left-2">
              Original full
            </Badge>
          </div>
          <div className="relative">
            <img
              alt={doc.id}
              className="w-full aspect-[341/256] rounded-md border"
              loading="lazy"
              src={getImageSrc(doc, 'cropped')}
            />
            <Badge variant="outline" className="absolute bottom-2 left-2">
              Cropped full
            </Badge>
          </div>
        </div>
      </FormField>
      <FormField label="Metadata">
        <CodeBlock expandable code={JSON.stringify(doc, null, 4)} />
      </FormField>
    </>
  )
}

const FormField = ({
  children,
  className,
  error,
  label,
}: {
  children: ReactNode
  className?: string
  error?: string
  label: string
}) => (
  <div className={cn('flex flex-col gap-y-2', className)}>
    <label className="py-1.5 text-sm leading-none font-medium">{label}</label>
    {children}
    {error ? (
      <span className="text-xs text-destructive italic">{error}</span>
    ) : null}
  </div>
)
