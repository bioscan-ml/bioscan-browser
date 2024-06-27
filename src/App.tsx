import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TopBar } from './components/top-bar'
import { Overview } from './pages/Overview/Overview'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TopBar />
      <main>
        <Overview />
      </main>
    </QueryClientProvider>
  )
}

export default App
