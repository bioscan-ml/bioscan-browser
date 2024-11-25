import { Link } from 'react-router-dom'
import { Menu } from './menu'
import { PageContent } from './page-content'

export const TopBar = () => (
  <header className="sticky top-0 h-16 py-8 bg-muted/95 border-b z-10">
    <PageContent>
      <div className="h-full flex items-center justify-between gap-12 lg:justify-start">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/bioscan-browser.png"
            className="h-12 w-12"
            alt="Bug inside a magnifying glass"
          />
          <h1 className="text-accent text-lg whitespace-nowrap">
            BIOSCAN Browser
          </h1>
        </Link>
        <Menu />
      </div>
    </PageContent>
  </header>
)
