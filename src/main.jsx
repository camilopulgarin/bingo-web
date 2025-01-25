import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './queryClient.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
     <QueryClientProvider client={queryClient}><App /></QueryClientProvider>
     </Provider>
  </StrictMode>,
)
