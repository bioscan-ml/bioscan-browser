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
import { About } from './pages/about'
import { AssetQuerier } from './pages/asset-querier'
import { TaxonomyViewer } from './pages/taxonomy-viewer'

const queryClient = new QueryClient()

const ROUTES = [
  { path: '/', element: <Navigate to="/taxonomy-viewer" replace /> },
  { path: '/taxonomy-viewer', Component: TaxonomyViewer },
  { path: '/asset-querier', Component: AssetQuerier },
  { path: '/search-similar', Component: SearchSimilar },
  { path: '/about', Component: About },
  { path: '*', element: <Navigate to="/" replace /> },
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
