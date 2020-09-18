import React from 'react'
import GlobalStyles from '../styles/global'
import { Provider } from 'react-redux'
import NoSSR from 'react-no-ssr'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import { AuthProvider } from '../providers/useAuth'

import store from '../state'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyles />
      <NoSSR>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <AuthProvider>
              <Header />
              <Component {...pageProps} />
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </NoSSR>
    </div>
  )
}

export default MyApp
