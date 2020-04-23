import { addReducer } from 'reactn'

import socket from '../utils/websocket.js'

addReducer('wsMessage', (global, dispatch, { type, ...data }) => {
  console.log({ type, data })
  if (type === 'newOrder') {
    dispatch.newOrder(data.order)
  }
  if (type === 'chatMessage') {
    dispatch.onChatMessage({ type, data })
  }
  return { wsMessage: { type, data } }
})

addReducer('onChatMessage', (global, dispatch, { from, message }) => {
  return {
    chatMessages: global.chatMessages.concat({ from, message }),
  }
})
addReducer('sendMessage', (global, dispatch, data) => {
  console.log('sendMessage', data)
  socket.emit('chatMessage', { from: global.user._id, message: data })
})
addReducer('flushMessage', () => ({ wsMessage: null }))
