import React from 'react'
import AppRoutes from './AppRoutes'
import './style.scss'
import './index.css'
import { AuthProvider } from './Features/Auth/auth.context'
import {FeedContextProvider} from './Features/Auth/posts/feed.context'

const App = () => {
  return (
    <>
    <AuthProvider>
      <FeedContextProvider>
      <AppRoutes/>
      </FeedContextProvider>
    </AuthProvider>
    </>
  )
}

export default App