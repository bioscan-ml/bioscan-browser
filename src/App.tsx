import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Overview } from './pages/Overview/Overview'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Overview />
    </QueryClientProvider>
  )
}

export default App
