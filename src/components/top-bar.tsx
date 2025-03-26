import { MAX_LG_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { Link } from 'react-router-dom'
import { DesktopMenu } from './menu/desktop-menu'
import { MobileMenu } from './menu/mobile-menu'
import { UserMenu } from './menu/user-menu'
import { PageContent } from './page-content'

export const TopBar = () => {
  const isLargeScreen = useMediaQuery(MAX_LG_QUERY)

  return isLargeScreen ? <DesktopTopBar /> : <MobileTopBar />
}

const DesktopTopBar = () => (
  <header className="sticky top-0 h-16 bg-muted/95 border-b z-10 box-border">
    <PageContent>
      <div className="h-full flex items-center justify-start gap-12">
        <Logo />
        <div className="flex items-center justify-between gap-2 grow">
          <DesktopMenu />
          <UserMenu />
        </div>
      </div>
    </PageContent>
  </header>
)

const MobileTopBar = () => (
  <header className="sticky top-0 h-16 bg-muted/95 border-b z-10 box-border">
    <PageContent>
      <div className="h-full flex items-center justify-between gap-12">
        <MobileMenu />
        <Logo />
        <UserMenu />
      </div>
    </PageContent>
  </header>
)

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 shrink-0">
    <img
      src="/assets/logos/bioscan-browser.png"
      className="h-12 w-12"
      alt="Bug inside a magnifying glass"
    />
    <h1 className="text-accent text-lg whitespace-nowrap">BIOSCAN Browser</h1>
  </Link>
)
