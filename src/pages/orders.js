import React, { getGlobal, useEffect, useDispatch, useState } from 'reactn'

import api from '../utils/api'
import OrdersComponent from '../components/orders/Orders'
import Loader from '../components/Loader'
import withLayout from '../components/layout/Layout'

const Orders = () => {
  const [isLoading, setLoading] = useState(true)
  const fetchOrders = useDispatch('fetchOrders')
  useEffect(() => {
    async function fetchData () {
      await fetchOrders()
      setLoading(false)
    }
    fetchData()
  }, [])
  return isLoading ? (
    <Loader />
  ) : (
    <OrdersComponent orders={getGlobal().orders} />
  )
}
export default withLayout(Orders)
