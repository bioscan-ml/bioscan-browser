import { PageContent } from './page-content'

export const TopBar = () => (
  <header className="sticky top-0 bg-muted/95 border-b z-10">
    <PageContent>
      <div className="h-16 flex items-center justify-start gap-4">
        <img src="/assets/cbg.png" className="h-8 w-8" />
        <h1 className="text-primary">BIOSCAN Browser</h1>
      </div>
    </PageContent>
  </header>
)
