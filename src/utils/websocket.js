import { getDispatch } from 'reactn'
import io from 'socket.io-client/dist/socket.io.slim.js'

import { isClient } from './misc.js'
import api from './api.js'

const socket = isClient() && io('http://localhost:3001/clients')

if (isClient()) {
  socket.on('newOrder', ({ order }) => {
    getDispatch().wsMessage({ type: 'newOrder', order })
  })
  socket.on('chatMessage', ({ from, message }) => {
    getDispatch().wsMessage({ type: 'chatMessage', from, message })
  })
}

export const registerSessionId = ({ wsSessionId, userId }) => {
  socket.emit('sessionId', wsSessionId, async () => {
    console.log('wsSessionId registered')
  })
}

export default socket
