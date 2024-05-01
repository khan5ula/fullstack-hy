import { useState } from 'react'

export const useToken = () => {
  const getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
  }

  return {
    setToken: saveToken,
    token,
  }
}
