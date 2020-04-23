import { useState, useRef, useGlobal, useDispatch } from 'reactn'
import router from 'next/router'
import {
  Button,
  ButtonGroup,
} from '@material-ui/core'
import BackIcon from '@material-ui/icons/NavigateBefore'
import useSWR from 'swr'

import withLayout from '../../components/layout/Layout.js'
import Loader from '../../components/Loader.js'
// import { withTranslation } from '../../../i18n.js'

const Order = () => {
  const { orderId } = router.query

  const [order] = useGlobal('order')
  const [actions] = useGlobal('actions')
  const fetchOrder = useDispatch('fetchOrder')
  const orderAction = useDispatch('orderAction')

  const { data } = useSWR(orderId, fetchOrder)
  const [open, setOpen] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const anchorRef = useRef(null)

  const handleBack = () => router.push('/orders')

  const handleAction = async (action) => {
    setLoading(true)
    console.log({ action })
    await orderAction(orderId, action)
    setLoading(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => setOpen(false)

  return data ? (
    <div>
      <Button
        variant='contained'
        color='primary'
        startIcon={<BackIcon />}
        onClick={handleBack}
      >
        Retour
      </Button>
      <ButtonGroup
        variant='contained'
        color='secondary'
        ref={anchorRef}
        aria-label='split button'
      >
        {actions.map((action) => (
          <Button key={action} onClick={() => handleAction(action)}>
            {action}
          </Button>
        ))}
      </ButtonGroup>
      <h1>Commande n°{orderId}</h1>
      <pre>{JSON.stringify(actions, null, 2)}</pre>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  ) : (
    <Loader />
  )
}

//Order.getInitialProps = async () => ({
//  namespacesRequired: ['common', 'orders'],
//})

export default withLayout(Order)
