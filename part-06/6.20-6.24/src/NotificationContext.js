import { createContext, useReducer, useContext } from 'react'

const initialState = ''

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return (`anecdote ${action.payload} created`)
    case 'VOTE':
      return (`anecdote ${action.payload} voted`)
    case 'ERROR':
      return (action.payload)
    case 'RESET':
      return initialState
    default:
      return initialState
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext