import { addReducer } from 'reactn'

import api from '../utils/api.js'

addReducer('newOrder', (global, dispatch, order) => {
  console.log({ order })
  return { orders: [{ ...order, isNew: true }, ...global.orders] }
})

//addReducer('ordersError', (global, dispatch, error) => ({
//  ordersError: error
//}))
//
addReducer('fetchOrders', async (global, dispatch, { filters } = {}) => {
  const { error, orders } = await api.get('/orders')
  if (error) return { ordersError: error }
  return { orders }
})

addReducer('fetchOrder', async (global, dispatch, orderId) => {
  const { error, order } = await api.get(`/orders/${orderId}`)
  return { order, orderError: error }
})
