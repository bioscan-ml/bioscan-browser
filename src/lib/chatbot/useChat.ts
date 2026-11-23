import { useContext } from 'react'
import { ChatContext } from './context'

export const useChat = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw Error('useChat must be used within ChatContextProvider')
  }

  return context
}
