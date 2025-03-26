import { MAX_LG_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { DesktopMenu } from './desktop-menu'
import { MobileMenu } from './mobile-menu'

export const Menu = () => {
  const isLargeScreen = useMediaQuery(MAX_LG_QUERY)

  return isLargeScreen ? <DesktopMenu /> : <MobileMenu />
}
