import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'

import api from './api'

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    async function validateLoggedCustomer() {
      const token = Cookies.get('token')
      if (token) {
        api.defaults.headers.authorization = token

        const { data } = await api.get('/api/auth/me')

        if (data) {
          setCustomer(data)
          setAuthenticated(true)
        }
      }

      setLoading(false)
    }

    validateLoggedCustomer()
  }, [])

  async function login(email) {
    const response = await api.post('/api/auth', { email })
    const { data: { token } } = response

    if (token) {
      Cookies.set('token', token, { expires: 60 })
      api.defaults.headers.authorization = token

      const { data } = await api.get('/api/auth/me')

      setCustomer(data)
      setAuthenticated(true)
      setLoading(false)
    }
  }

  function logout() {
    Cookies.remove('token')
    setAuthenticated(false)
    setCustomer({})

    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, login, customer, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function ProtectRoute(Component) {
  return () => {
    const { isAuthenticated, loading } = useAuth()

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        Router.push('/entrar')
      }
    }, [loading, isAuthenticated])

    return (<Component {...arguments} />)
  }
}

export default function useAuth() {
  const context = useContext(AuthContext)

  return context
}

