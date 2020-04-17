import React, {useEffect, useState} from 'reactn'
import router from 'next/router'

import withLayout from '../../components/layout/Layout.js'
import Loader from '../../components/Loader.js'

const Order = () => {
  const [order, setOrder] = useState(null)
      const {orderId} = router.query
      console.log({orderId})
  useEffect(() => {
    const getOrder = async () => {
    }
    getOrder()
  })
  return !order ? <Loader /> : (<h1>Commande {orderId}</h1>

  )
}

export default withLayout(Order)
