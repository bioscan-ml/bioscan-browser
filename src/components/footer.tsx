import { PageContent } from './page-content'

interface FooterProps {
  className?: string
}

export const Footer = ({ className }: FooterProps) => (
  <div className="py-8 border-border border-t bg-muted lg:py-12">
    <PageContent className={className}>
      <div className="flex flex-col items-center gap-8">
        <p className="max-w-lg text-center text-sm text-muted-foreground">
          BIOSCAN Browser is supported in part by funding from the Government of
          Canada’s New Frontiers in Research Fund (NFRF), Artificial
          Intelligence and Biodiversity Change (ABC) Global Center, Canada
          Research Chairs, and Canadian Institute for Advanced Research (CIFAR).
          We acknowledge the support of the Natural Sciences and Engineering
          Research Council of Canada (NSERC).
        </p>
        <div className="max-w-4xl flex justify-center flex-wrap gap-8">
          <Logo
            alt="Government of Canada"
            src="/assets/logos/funders/goc.jpg"
          />
          <Logo alt="NFRF" src="/assets/logos/funders/nfrf.jpg" />
          <Logo alt="ABC" src="/assets/logos/funders/abc.png" />
          <Logo alt="CIFAR" src="/assets/logos/funders/cifar.png" />
          <Logo alt="NSERC" src="/assets/logos/funders/nserc.png" />
        </div>
      </div>
    </PageContent>
  </div>
)

const Logo = ({ alt, src }: { alt: string; src: string }) => (
  <img
    alt={alt}
    className="w-64 h-32 p-4 bg-background rounded-md border object-contain"
    src={src}
  />
)
