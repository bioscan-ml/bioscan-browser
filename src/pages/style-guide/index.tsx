import { PageContent } from '@/components/page-content'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
import { cn } from '@/lib/utils'
import { CopyIcon, DownloadIcon, ExternalLinkIcon } from 'lucide-react'
import { CSSProperties } from 'react'
import colors from 'tailwindcss/colors'

export const StyleGuide = () => (
  <PageContent>
    <article className="max-w-screen-md py-12 space-y-16">
      <h1 className="text-accent mb-2">Style guide</h1>
      <div>
        <h3 className="text-accent mb-2">BIOSCAN Logo Pack</h3>
        <p className="text-muted-foreground mb-8">
          We provide one logo for the dataset and a variant for the browser. The
          logo pack includes 6 versions in total and files in both vector (SVG)
          and pixel (PNG) format. The main logos are the colored versions.
          Outlined or inverted logos can be used for special cases.
        </p>
        <a
          href="/assets/bioscan-logo-pack@v1.zip"
          className={cn(
            'mb-12',
            buttonVariants({
              variant: 'outline',
            }),
          )}
        >
          Download the logo pack
          <DownloadIcon className="h-4 w-4 ml-3" />
        </a>
        <h4 className="mb-4">Versions</h4>
        <div className="max-w-lg grid grid-cols-3 gap-x-8 gap-y-12 mb-12">
          <LogoItem label="bioscan" src="/assets/logos/bioscan.png" />
          <LogoItem
            label="bioscan-outline"
            src="/assets/logos/bioscan-outline.png"
          />
          <LogoItem
            label="bioscan-inverted"
            src="/assets/logos/bioscan-inverted.png"
            bgTheme="dark"
          />
          <LogoItem
            label="bioscan-browser"
            src="/assets/logos/bioscan-browser.png"
          />
          <LogoItem
            label="bioscan-browser-outline"
            src="/assets/logos/bioscan-browser-outline.png"
          />
          <LogoItem
            label="bioscan-browser-inverted"
            src="/assets/logos/bioscan-browser-inverted.png"
            bgTheme="dark"
          />
        </div>
      </div>
      <div>
        <h3 className="text-accent mb-2">BIOSCAN Typography</h3>
        <p className="text-muted-foreground mb-8">
          For typography, we use a set of open source fonts, all avaible on{' '}
          <a href="https://fonts.google.com/" className="text-link">
            Google Fonts
          </a>
          .
        </p>
        <div className="grid grid-cols-3 gap-x-8 gap-y-12">
          <FontItem
            label="Montserrat"
            description="Used for medium and large headings."
            style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
            link="https://fonts.google.com/specimen/Montserrat"
          />
          <FontItem
            label="Source Sans 3"
            description="Used for small headings and body text."
            style={{ fontFamily: 'Source Sans', fontWeight: 500 }}
            link="https://fonts.google.com/specimen/Source+Sans+3"
          />
          <FontItem
            label="Source Code Pro"
            description="Used for code snippets and numeric values."
            style={{ fontFamily: 'Source Code', fontWeight: 400 }}
            link="https://fonts.google.com/specimen/Source+Code+Pro"
          />
        </div>
      </div>
      <div>
        <h3 className="text-accent mb-2">BIOSCAN Color Scheme</h3>
        <p className="text-muted-foreground mb-8">
          The color scheme matches the logo pack and can be used for BIOSCAN
          material, for example presentations. The color scheme is a fully
          optional resource.
        </p>
        <div className="flex items-start justify-center flex-wrap gap-x-8 gap-y-12">
          <ColorItem
            label="white"
            hex={colors.white}
            description="Used for backgrounds"
          />
          <ColorItem
            label="gray-50"
            hex={colors.gray[50]}
            description="Used for muted backgrounds"
          />
          <ColorItem
            label="gray-200"
            hex={colors.gray[200]}
            description="Used for borders and separators"
          />
          <ColorItem
            label="gray-500"
            hex={colors.gray[500]}
            description="Used for low contrast text"
            iconTheme="light"
          />
          <ColorItem
            label="gray-800"
            hex={colors.gray[800]}
            description="Used for text"
            iconTheme="light"
          />
          <ColorItem
            label="emerald-500"
            hex={colors.emerald[500]}
            description="Used as a primary color"
            iconTheme="light"
          />
          <ColorItem
            label="emerald-600"
            hex={colors.emerald[600]}
            description="Used as a primary color"
            iconTheme="light"
          />
          <ColorItem
            label="sky-200"
            hex={colors.sky[200]}
            description="Used as an accent color"
          />
          <ColorItem
            label="sky-500"
            hex={colors.sky[500]}
            description="Used as an accent color"
            iconTheme="light"
          />
          <ColorItem
            label="sky-800"
            hex={colors.sky[800]}
            description="Used as an accent color"
            iconTheme="light"
          />
        </div>
      </div>
    </article>
  </PageContent>
)

const LogoItem = ({
  label,
  src,
  bgTheme = 'light',
}: {
  label: string
  src: string
  bgTheme?: 'light' | 'dark'
}) => (
  <div className="flex flex-col gap-2 items-center text-center">
    <div
      className={cn(
        'w-full aspect-square flex items-center justify-center p-4 rounded-md border bg-background',
        { 'bg-accent': bgTheme === 'dark' },
      )}
    >
      <img src={src} />
    </div>
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
)

const ColorItem = ({
  label,
  hex,
  description,
  iconTheme = 'dark',
}: {
  label: string
  hex: string
  description: string
  iconTheme?: 'light' | 'dark'
}) => {
  const { toast } = useToast()

  return (
    <div className="w-32 flex flex-col gap-2 items-center text-center">
      <div
        className="group w-24 h-24 flex items-center justify-center rounded-md border cursor-pointer"
        style={{ backgroundColor: hex }}
        onClick={() => {
          navigator.clipboard.writeText(hex)
          toast({ description: 'Copied to clipboard!' })
        }}
      >
        <CopyIcon
          className={cn('w-4 h-4 invisible group-hover:visible', {
            'text-foreground': iconTheme === 'dark',
            'text-background': iconTheme === 'light',
          })}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm">{label}</span>
        <code className="text-sm">{hex}</code>
      </div>
      <span className="text-sm text-muted-foreground">{description}</span>
    </div>
  )
}

const FontItem = ({
  label,
  description,
  link,
  style,
}: {
  label: string
  description: string
  link: string
  style?: CSSProperties
}) => (
  <div className="w-full flex flex-col items-start justify-start p-4 rounded-md border bg-background">
    <span className="mb-2 text-lg" style={style}>
      {label}
    </span>
    <span className="mb-4 text-sm text-muted-foreground">{description}</span>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'icon' }),
        'self-end',
      )}
    >
      <ExternalLinkIcon className="w-4 h-4" />
    </a>
  </div>
)
