import { addReducer } from 'reactn'

import api from '../utils/api.js'

addReducer('ordersError', (global, dispatch, error) => ({
  ordersError: error
}))

addReducer('fetchOrders', async (global, dispatch, ...params) => {
  const { error, orders } = await api.get('/users/me/orders')
  if (error) return { ordersError: error }
  return { orders }
})
