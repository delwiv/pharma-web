import { getDispatch } from 'reactn'
import io from 'socket.io-client/dist/socket.io.slim.js'
import { isClient } from './misc.js'
import api from './api.js'

const socket = isClient() && io('http://localhost:3001/clients')

if (isClient()) {
  const { wsMessage } = getDispatch()
  socket.on('newOrder', ({ order }) => {
    wsMessage({ type: 'newOrder', order })
  })
}

export const registerSessionId = ({ wsSessionId, userId }) => {
  socket.emit('sessionId', wsSessionId, async () => {
    console.log('wsSessionId registered')
  })
}

export default socket
