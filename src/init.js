import { setGlobal } from 'reactn'
import router from 'next/router'

import './reducers'
import { isClient } from './utils/misc'
import { get, del } from './utils/storage'
import api from './utils/api'
import { fetchMe } from './utils/auth'

const pageNames = {
  '/login': 'Connexion',
  '/orders': 'Commandes',
  '/profile': 'Mon profil'
}

const updatePageName = url => {
  setGlobal({ pageName: pageNames[url] })
}

const init = async () => {
  const wantedRoute = router.pathname

  router.events.on('routeChangeStart', updatePageName)
  updatePageName(wantedRoute)

  if (wantedRoute !== '/') setGlobal({ wantedRoute })
  console.log({ wantedRoute, token: await get('token'), isClient: isClient() })
  if (!(await get('token')) && isClient()) {
    console.log('no token, redirect login')
    return router.push('/login')
  }
  const { user, error } = await fetchMe()
  if (error) {
    console.log('error, redirect login', { error })
    await del('token')
    setGlobal({ user: null })
    return isClient() && router.push('/login')
  }
  if (user) {
    setGlobal({ user })
  }
}
export default init
