import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/user/UserProvider.jsx'
import { ProductsProvider } from './context/products/ProductsProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
    <ProductsProvider>

    <App />
    </ProductsProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
