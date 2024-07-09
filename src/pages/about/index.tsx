import { PageContent } from '@/components/page-content'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExternalLinkIcon } from 'lucide-react'
import { CONTENT } from './content'

export const About = () => (
  <PageContent>
    <article className="max-w-screen-md py-12 space-y-12">
      <div>
        <h1 className="text-primary mb-2">{CONTENT.title}</h1>
        <h2 className="mb-4">{CONTENT.subTitle}</h2>
        <div className="flex gap-4">
          {CONTENT.resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              {resource.label}
              <ExternalLinkIcon className="h-4 w-4 ml-3" />
            </a>
          ))}
        </div>
      </div>
      <Separator />
      {CONTENT.sections.map((section, si) => (
        <div key={si}>
          <h3 className="text-primary mb-2">{section.title}</h3>
          <div className="space-y-4 text-muted-foreground">
            {section.paragraphs.map((paragraph, pi) => (
              <p key={pi}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </article>
  </PageContent>
)
