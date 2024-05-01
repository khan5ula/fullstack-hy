import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      dispatch({ type: 'ADD', payload: newAnecdote.content })
      setTimeout(() => { dispatch('RESET') }, 5000)
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: error => {
      dispatch({ type: 'ERROR', payload: error.response.data.error })
      setTimeout(() => { dispatch('RESET') }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
      <br />
    </div>
  )
}

export default AnecdoteForm
