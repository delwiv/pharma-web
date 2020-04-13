import qs from 'query-string'
import fetch from 'isomorphic-unfetch'

import { get } from './storage'

const API_URL = 'http://localhost:3003/api'

const parseResponse = async data => {
  try {
    const result = await data.json()
    return result
  } catch (error) {
    throw new Error('request-failed', error.message)
  }
}

const makeRequest = async ({ route, method, data }) => {
  const token = await get('token')
  return fetch(`${API_URL}${route}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || '798f17d8-6d34-4571-8d58-00a8dacf0e6f'}`
    },
    method,
    body: data && JSON.stringify(data)
  }).then(parseResponse)
}

export default {
  get: (route, data) => {
    const query = data ? `?${qs.stringify(data)}` : ''
    return makeRequest({ route: route + query, method: 'GET' })
  },
  post: (route, data) => makeRequest({ route, data, method: 'POST' })
}
