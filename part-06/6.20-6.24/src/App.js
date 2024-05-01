import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updatedAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: updatedAnecdote => {
      const updatedAnecdotes = anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )

      dispatch({ type: 'VOTE', payload: updatedAnecdote.content });
      setTimeout(() => { dispatch('RESET') }, 5000)
      queryClient.setQueryData('anecdotes', updatedAnecdotes);
    }
  });


  const handleVote = anecdote => {
    updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const hasNvotes = {
    fontSize: 12
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div style={hasNvotes}>
            has {anecdote.votes} votes
            {' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
          <br />
        </div>
      )}
    </div>
  )
}

export default App
