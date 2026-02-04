import { Toaster } from '@/components/ui/toast/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { TopBar } from './components/top-bar'
import { BookmarksContextProvider } from './lib/bookmarks/provider'
import { PATHS } from './lib/constants'
import { About } from './pages/about'
import { FindSimilar } from './pages/find-similar'
import { Home } from './pages/home'
import { MyBookmarks } from './pages/my-bookmarks'
import { Record } from './pages/record'
import { Report } from './pages/report'
import { Search } from './pages/search'
import { StyleGuide } from './pages/style-guide'
import { TaxonomyTree } from './pages/taxonomy-tree'

const queryClient = new QueryClient()

const ROUTES = [
  { path: PATHS.HOME, Component: Home },
  { path: PATHS.RECORD, Component: Record },
  { path: PATHS.SEARCH, Component: Search },
  { path: PATHS.TAXONOMY_TREE, Component: TaxonomyTree },
  { path: PATHS.FIND_SIMILAR, Component: FindSimilar },
  { path: PATHS.REPORT, Component: Report },
  { path: PATHS.STYLE_GUIDE, Component: StyleGuide },
  { path: PATHS.ABOUT, Component: About },
  { path: PATHS.MY_BOOKMARKS, Component: MyBookmarks },
  { path: '*', element: <Navigate to={PATHS.HOME} replace /> },
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <BrowserRouter>
          <TopBar />
          <main>
            <Routes>
              {ROUTES.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Routes>
          </main>
          <Toaster />
          <ScrollToTop />
        </BrowserRouter>
      </BookmarksContextProvider>
    </QueryClientProvider>
  )
}

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default App
