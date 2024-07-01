import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TopBar } from './components/top-bar'
import { About } from './pages/about'
import { AssetQuerier } from './pages/asset-querier'
import { TaxonomyViewer } from './pages/taxonomy-viewer'

const queryClient = new QueryClient()

const ROUTES = [
  { path: '/', element: <Navigate to="/taxonomy-viewer" replace /> },
  { path: '/taxonomy-viewer', Component: TaxonomyViewer },
  { path: '/asset-querier', Component: AssetQuerier },
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
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
