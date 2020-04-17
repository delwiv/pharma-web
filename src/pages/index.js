import React, {
  Component,
  useGlobal,
  setGlobal,
  getGlobal,
  useState
} from 'reactn'
import router from 'next/router'

import Loader from '../components/Loader'
import api from '../utils/api'

class Index extends Component {
  async componentDidMount () {
    const { user, error } = await api.get('/users/me')
    if (error) {
      return router.push('/login')
    }
    if (user) {
      const route = getGlobal().wantedRoute || '/orders'
      console.log({ indexWantedRoute: route })
      return router.push(route)
    }
  }

  render () {
    return <Loader withLogo={true} />
  }
}
export default Index
