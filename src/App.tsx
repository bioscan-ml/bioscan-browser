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
import { SearchSimilar } from './components/search-similar'
import { TopBar } from './components/top-bar'
import { BookmarksContextProvider } from './lib/bookmarks/provider'
import { About } from './pages/about'
import { AssetQuerier } from './pages/asset-querier'
import { MyBookmarks } from './pages/my-bookmarks'
import { StyleGuide } from './pages/style-guide'
import { TaxonomyViewer } from './pages/taxonomy-viewer'

const queryClient = new QueryClient()

const ROUTES = [
  { path: '/', element: <Navigate to="/search" replace /> },
  { path: '/search', Component: AssetQuerier },
  { path: '/taxonomy-tree', Component: TaxonomyViewer },
  { path: '/find-similar', Component: SearchSimilar },
  { path: '/style-guide', Component: StyleGuide },
  { path: '/about', Component: About },
  { path: '/my-bookmarks', Component: MyBookmarks },
  { path: '*', element: <Navigate to="/" replace /> },
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
