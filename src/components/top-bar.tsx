import { Link } from 'react-router-dom'
import { Menu } from './menu'
import { PageContent } from './page-content'
import { TaxaSearch } from './taxa-search'

export const TopBar = () => (
  <header className="sticky top-0 h-16 py-8 bg-background/95 border-b z-10">
    <PageContent>
      <div className="h-full flex items-center justify-center gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/cbg.png"
            className="h-8 w-8"
            alt="Center for Biodiversity Genomics"
          />
          <h1 className="text-primary text-base whitespace-nowrap hidden sm:block">
            BIOSCAN Browser
          </h1>
        </Link>
        <div className="w-full flex items-center justify-end gap-2 lg:flex-row-reverse lg:justify-between">
          <TaxaSearch />
          <Menu />
        </div>
      </div>
    </PageContent>
  </header>
)
