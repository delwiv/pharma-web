import { setGlobal } from 'reactn'
import router from 'next/router'
import addReactNDevTools from 'reactn-devtools'

import './reducers'
import { isClient } from './utils/misc'
import { get, del } from './utils/storage'
import { registerSessionId } from './utils/websocket.js'
import api from './utils/api'
import { fetchMe } from './utils/auth'

addReactNDevTools()

const pageNames = {
  '/login': 'Connexion',
  '/orders': 'Commandes',
  '/orders/[orderId]': 'Détails commande',
  '/profile': 'Mon profil',
}

const updatePageName = (url) => {
  setGlobal({ pageName: pageNames[url] })
}

const init = async () => {
  setGlobal({ appStarted: true })
  const wantedRoute = router.pathname

  router.events.on('routeChangeStart', updatePageName)
  updatePageName(wantedRoute)

  if (wantedRoute !== '/') setGlobal({ wantedRoute })
  console.log({ wantedRoute, token: await get('token'), isClient: isClient() })
  if (!(await get('token')) && isClient()) {
    console.log('no token, redirect login')
    return router.push('/login')
  }
  const { user, error, wsSessionId } = await fetchMe()
  if (error) {
    console.log('error, redirect login', { error })
    await del('token')
    setGlobal({ user: null })
    return isClient() && router.push('/login')
  }
  if (user) {
    setGlobal({ user, wsSessionId })
    registerSessionId({ wsSessionId, userId: user._id })
  }
}
export default init
