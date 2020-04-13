import { setGlobal } from 'reactn'

import { set } from './storage.js'
import api from './api'

export const login = async creds => {
  const { user, token, error } = await api.post('/users/login', creds)

  if (error) {
    return { error }
  }
  await set('token', token)
  return { user }
}
