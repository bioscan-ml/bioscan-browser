import { CodeBlock } from '@/components/code-block'
import { DocDetailsDialog } from '@/components/doc-details/doc-details-dialog'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { COMMENT_INSTRUCTIONS, REPORT_TYPES } from '@/hooks/github/constants'
import { ReportFormData } from '@/hooks/github/types'
import { useCreateIssue } from '@/hooks/github/useCreateIssue'
import { useId } from '@/hooks/search-params/useId'
import { useBoldRecord } from '@/hooks/useBoldRecord'
import { useRecord } from '@/hooks/useRecord'
import { RESOURCES } from '@/lib/constants'
import { getImageSrc } from '@/lib/getImageSrc'
import { cn } from '@/lib/cn'
import { Doc } from '@/types/response-data'
import { ExternalLinkIcon, EyeIcon, Loader2Icon } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required.',
  NOT_FOUND: 'Could not find record, please try again.',
  UNKNOWN: 'Could not submit the report, please try again.',
  GITHUB_USER: 'Enter a GitHub username, with or without a leading @.',
}

export const Report = () => {
  const { id, setId } = useId()
  const { createIssue, error, isPending, isSuccess, reset, data } =
    useCreateIssue()

  return (
    <PageContent>
      <div className="max-w-screen-md py-6 space-y-8 md:py-12 md:space-y-12">
        <div>
          <h1 className="text-accent mb-2">Report</h1>
          <p className="text-muted-foreground mb-8">
            Here you can report a problem or suggest updates to BIOSCAN-5M. Your
            report will be submitted as a GitHub issue and you can follow the
            report progress in the GitHub project. If the report is approved,
            the update will be included with the next version of the dataset.
            Thank you for helping us improve BIOSCAN-5M!
          </p>
          <div className="flex gap-4">
            <a
              className={buttonVariants({ variant: 'outline' })}
              href={RESOURCES.DATASET_GITHUB_ISSUES}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub issues
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </a>
            <a
              className={buttonVariants({ variant: 'outline' })}
              href={RESOURCES.DATASET_GITHUB_PROJECT}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub project
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
        {isSuccess ? (
          <AfterSubmit
            onNewReportClick={() => {
              setId(null)
              reset()
            }}
            url={data?.html_url}
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
      </div>
    </PageContent>
  )
}

const AfterSubmit = ({
  onNewReportClick,
  url,
}: {
  onNewReportClick: () => void
  url?: string
}) => (
  <div className="p-8 rounded-sm bg-muted border md:p-12">
    <h3 className="text-accent mb-8">
      Thank you for helping us improve BIOSCAN-5M!
    </h3>
    <h4 className="mb-2">What happens now?</h4>
    <p className="text-muted-foreground mb-8">
      Your report has been submitted as a GitHub issue and a dataset admin will
      now take a closer look at it. This can take a few days, weeks or even
      months. It all depends on our current availability, but also the report
      type. Reports related to the taxonomic label typically take longer time to
      resolve. If the report is approved, the update will be included with the
      next version of the dataset.
    </p>
    <h4 className="mb-2">How can I follow the report progress?</h4>
    <p className="text-muted-foreground mb-8">
      You can follow the report progress and related conversations on GitHub!
    </p>
    <div className="flex gap-4">
      {url ? (
        <a
          className={buttonVariants()}
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Your report
          <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </a>
      ) : null}
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
  createIssue: (data: {
    formData: ReportFormData
    doc: Doc
    boldDoc?: unknown
  }) => void
  error: Error | null
  id: string | null
  isPending: boolean
  setId: (id: string | null) => void
}) => {
  const {
    data: doc,
    error: docError,
    isPending: docIsPending,
  } = useRecord({ id: id?.length ? id : undefined })
  const { data: boldDoc, isPending: boldDocIsPending } = useBoldRecord({
    id: id?.length ? id : undefined,
  })
  const { control, watch, handleSubmit, reset } = useForm<ReportFormData>({
    defaultValues: {
      comments: '',
      id: id ?? '',
      type: '',
      name: '',
      gitHubUser: '',
    },
  })
  const type = watch('type')

  const onClear = () => {
    reset()
    setId(null)
  }

  return (
    <form
      className="p-6 space-y-8 rounded-sm bg-muted border md:p-12 md:space-y-12"
      onSubmit={handleSubmit((formData) => {
        if (doc) {
          createIssue({ formData, doc, boldDoc })
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
              label="Process ID *"
              error={
                fieldState.error?.message
                  ? fieldState.error.message
                  : docError
                    ? ERROR_MESSAGES.NOT_FOUND
                    : undefined
              }
            >
              <div className="flex gap-2">
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setId(e.currentTarget.value ?? null)
                  }}
                  placeholder="Specify a process ID"
                />
                {doc ? <RecordDetailsDialog doc={doc} /> : null}
              </div>
            </FormField>
          )}
        />
        {id && (
          <RecordDetails
            boldDoc={boldDoc}
            boldDocIsPending={boldDocIsPending}
            doc={doc}
            docIsPending={docIsPending}
          />
        )}
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
                <SelectTrigger
                  ref={field.ref}
                  className="[&>span:first-child]:contents"
                >
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map(({ title, label }) => (
                    <SelectItem
                      key={title}
                      className="[&>span:last-child]:contents"
                      value={title}
                    >
                      <div className="flex-1 flex gap-2">
                        <span>{title}</span>
                        <div className="flex-1" />
                        {label ? (
                          <Badge variant="outline">{label}</Badge>
                        ) : null}
                      </div>
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
          render={({ field, fieldState }) => {
            const label = REPORT_TYPES.find(
              ({ title }) => type === title,
            )?.label

            return (
              <FormField
                label="Comments"
                description={label ? COMMENT_INSTRUCTIONS[label] : undefined}
                error={fieldState.error?.message}
              >
                <Textarea {...field} maxLength={5000} />
              </FormField>
            )
          }}
        />
        <div>
          <h4 className="mb-2">Submitted by (optional)</h4>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <FormField label="Name" error={fieldState.error?.message}>
                  <Input {...field} maxLength={100} />
                </FormField>
              )}
            />
            <Controller
              control={control}
              name="gitHubUser"
              rules={{
                pattern: {
                  value:
                    /^(?:@?[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?)?$/,
                  message: ERROR_MESSAGES.GITHUB_USER,
                },
              }}
              render={({ field, fieldState }) => (
                <FormField
                  label="GitHub user"
                  error={fieldState.error?.message}
                >
                  <Input {...field} maxLength={40} />
                </FormField>
              )}
            />
          </div>
        </div>
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
        <p className="text-xs text-muted-foreground italic">
          All information submitted will be public on GitHub.
        </p>
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
  boldDoc,
  boldDocIsPending,
  doc,
  docIsPending,
}: {
  boldDoc?: unknown
  boldDocIsPending: boolean
  doc?: Doc
  docIsPending: boolean
}) => {
  if (docIsPending) {
    return <Loader />
  }

  if (!doc) {
    return null
  }

  return (
    <>
      <FormField label="Images">
        <div className="grid grid-cols-2 gap-8">
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
      <div>
        <h4 className="mb-2">Metadata</h4>
        <div className="grid grid-cols-1 gap-8">
          <FormField label="BIOSCAN-5M">
            <CodeBlock expandable code={JSON.stringify(doc, null, 4)} />
          </FormField>
          <FormField label="BOLD">
            <CodeBlock
              expandable={!!boldDoc}
              code={
                boldDocIsPending
                  ? 'Loading...'
                  : boldDoc
                    ? JSON.stringify(boldDoc, null, 4)
                    : 'Not found'
              }
            />
          </FormField>
        </div>
      </div>
    </>
  )
}

const RecordDetailsDialog = ({ doc }: { doc: Doc }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              size="icon"
              type="button"
              variant="ghost"
            >
              <EyeIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Show details</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DocDetailsDialog doc={doc} open={!!open} onOpenChange={setOpen} />
    </>
  )
}

const FormField = ({
  children,
  className,
  description,
  error,
  label,
}: {
  children: ReactNode
  className?: string
  description?: string
  error?: string
  label: string
}) => (
  <div className={cn('flex flex-col gap-y-2', className)}>
    <label className="py-1.5 text-sm leading-none font-medium">{label}</label>
    {children}
    {description ? (
      <span className="text-xs text-muted-foreground italic">
        {description}
      </span>
    ) : null}
    {error ? (
      <span className="text-xs text-destructive italic">{error}</span>
    ) : null}
  </div>
)
