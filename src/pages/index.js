import React, { getGlobal } from 'reactn'
import router from 'next/router'
import useSWR from 'swr'

import Loader from '../components/Loader'
import api from '../utils/api'
// import { withTranslation } from '../../i18n.js'

const Index = () => {
  const { data, error } = useSWR('/users/me', api.get)
  if (error) {
    router.push('/login')
  }
  if (data) {
    const route = getGlobal().wantedRoute || '/orders'
    router.push(route)
  }
  return <Loader withLogo />
}

// Index.getInitialProps = () => ({ namespacesRequired: ['common'] })

export default Index
