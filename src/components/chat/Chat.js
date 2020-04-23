import React, { useDispatch } from 'reactn'
import dynamic from 'next/dynamic'

import { isClient } from '../../utils/misc.js'

const Widget = isClient() ? (
  dynamic(() => import('react-chat-widget').then((mod) => mod.Widget))
) : (
  <div />
)

export default () => {
  const { onChatMessage, sendMessage } = useDispatch()
  const handleNewUserMessage = (message) => {
    console.log('component new message', { message })
    sendMessage(message)
  }
  return <Widget handleNewUserMessage={handleNewUserMessage} />
}
