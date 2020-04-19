import { addReducer } from 'reactn'

import { set, del } from '../utils/storage.js'
import api from '../utils/api.js'

addReducer('loginError', (global, dispatch, loginError) => ({
  loginError,
  user: null,
  token: null
}))
addReducer('fetchMe', async (global, dispatch, ...params) => {
  const { error, user } = await api.get('/users/me')
  if (error) return { fetchMeError: error }
  return { user, fetchMeError: null }
})

addReducer('login', async (global, dispatch, creds) => {
  const { user, token, error } = await api.post('/users/login', creds)

  console.log({ user, token, error })
  if (error) return { loginError: error }
  await set('token', token)
  return { user, loginError: null }
})

addReducer('logout', async (global, dispatch) => {
  await api.post('/users/logout').catch(() => {})
  await del('token')
  return { user: null }
})
