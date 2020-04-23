import { setGlobal } from 'reactn'
import router from 'next/router'

import { set, del } from './storage.js'
import api from './api'

export const login = async (creds) => {
  const { user, token, error } = await api.post('/users/login', creds)

  console.log({ user, token, error })
  if (error) {
    return { error }
  }
  await set('token', token)
  setGlobal({ user })
  return { user }
}

export const fetchMe = () => api.get('/users/me')

export const logout = async () => {
  setGlobal({ user: null })
  await api.post('/users/logout')
  await del('token')
  router.push('/login')
}
