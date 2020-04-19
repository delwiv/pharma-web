import { addReducer } from 'reactn'

addReducer('wsMessage', (global, dispatch, { type, ...data }) => {
  console.log({ type, data })
  if (type === 'newOrder') {
    dispatch.newOrder(data.order)
  }
  return { wsMessage: { type, data } }
})

addReducer('flushMessage', () => ({ wsMessage: null }))
