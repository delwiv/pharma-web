import { setGlobal } from 'reactn'
import { get } from './utils/storage.js'
import api from './utils/api'

const init = async () => {
  const user = await get('user')
  if (user) setGlobal({ user })
}
export default init
