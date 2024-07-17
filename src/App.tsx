import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import NextTopLoader from 'nextjs-toploader'
import React, { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'
import ProductPage from './pages/Product'
import LoginPage from './pages/Login'
import NotFoundPage from './pages/404'
import OrderQueryPage from './pages/CustomerSupport/OrderQuery'
import DepositPage from './pages/Deposit'
import QueryDeposit from './pages/Deposit/QueryDeposit'

export const UserContext = createContext({} as any)
const queryClient = new QueryClient()

function App() {
  const [user, setUser] = React.useState({ loggedIn: false })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color="#1677ff" showSpinner={false} zIndex={51} />

        <ConfigProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="customer-support/order-query" element={<OrderQueryPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="deposit/query-detail" element={<QueryDeposit />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ConfigProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  )
}

export default App
