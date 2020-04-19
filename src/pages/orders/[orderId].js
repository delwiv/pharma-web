import router from 'next/router'
import { Button } from '@material-ui/core'
import BackIcon from '@material-ui/icons/NavigateBefore'
import useSWR from 'swr'

import api from '../../utils/api.js'
import withLayout from '../../components/layout/Layout.js'
import Loader from '../../components/Loader.js'

const Order = () => {
  const { orderId } = router.query
  const handleBack = () => router.push('/orders')
  const { data } = useSWR(`/users/me/orders/${orderId}`, api.get)
  return data ? (
    <div>
      <Button variant='contained' startIcon={<BackIcon />} onClick={handleBack}>
        Retour
      </Button>
      <h1>Commande n°{orderId}</h1>
      <pre>{JSON.stringify(data.order, null, 2)}</pre>
    </div>
  ) : (
    <Loader />
  )
}

export default withLayout(Order)
