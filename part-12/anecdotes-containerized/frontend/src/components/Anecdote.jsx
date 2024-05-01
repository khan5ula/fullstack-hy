import { useDispatch, useSelector } from 'react-redux'
import { deleteAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)

  const handleVoteClick = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(
      setNotification(
        `You voted '${anecdotes.find((n) => n.id === id).content}'`,
        5000
      )
    )
  }

  const handleDelete = (id) => {
    dispatch(deleteAnecdote(id))
    dispatch(setNotification('Anecdote deleted', 5000))
  }

  const styles = {
    container: {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 15,
    },
    button: {
      marginLeft: 8,
    },
  }

  return (
    <div style={styles.container}>
      {anecdote.content}
      {<br />}
      has {anecdote.votes}
      {' votes '}
      <button
        style={styles.button}
        onClick={() => handleVoteClick(anecdote.id)}
      >
        vote
      </button>
      <button style={styles.button} onClick={() => handleDelete(anecdote.id)}>
        delete
      </button>
    </div>
  )
}

export default Anecdote
