import { useDispatch, useGlobal } from 'reactn'
import useSWR from 'swr'

import OrdersComponent from '../components/orders/Orders'
import Loader from '../components/Loader'
import withLayout from '../components/layout/Layout'

const Orders = () => {
  const fetchOrders = useDispatch('fetchOrders')
  const [orders] = useGlobal('orders')
  useSWR('/orders', fetchOrders)
  return orders ? <OrdersComponent orders={orders} /> : <Loader />
}

export default withLayout(Orders)
