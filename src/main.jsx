import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './queryClient.js'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </QueryClientProvider>
     </Provider>
    </ThemeProvider>
    
  </StrictMode>,
)
