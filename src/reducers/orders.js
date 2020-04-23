import { addReducer } from 'reactn'

import api from '../utils/api.js'

addReducer('newOrder', (global, dispatch, order) => {
  console.log({ order })
  order.isNew = true
  return {
    orders: [order, ...global.orders],
  }
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
  const { error, order, actions } = await api.get(`/orders/${orderId}`)
  return { order, actions, orderError: error }
})

addReducer('orderAction', async (global, dispatch, orderId, action) => {
  const { error, order, actions } = await api.put(
    `/orders/${orderId}/${action}`
  )
  return { orderError: error, order, actions }
})
