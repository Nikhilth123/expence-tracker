import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from 'next-themes'
import { AuthProvider } from './context/Authcontextprovider.tsx'
import { TransactionProvider } from './context/Transactioncontextprovider.tsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <AuthProvider>
      <TransactionProvider>
     <ThemeProvider attribute="class"
      defaultTheme="system"
      enableSystem
      >
    <App />
     <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </ThemeProvider>
    </TransactionProvider>
    </AuthProvider>
  </StrictMode>,
)
