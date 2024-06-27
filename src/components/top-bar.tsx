import { PageContent } from './page-content'

export const TopBar = () => (
  <header className="sticky top-0 bg-muted/95 z-10">
    <PageContent>
      <div className="h-16 px-4 flex items-center justify-between border-b">
        <h1 className="font-medium">🪲 BIOSCAN Browser</h1>
      </div>
    </PageContent>
  </header>
)
