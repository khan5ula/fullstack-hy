import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const Anecdotes = () => {
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state =>
    [...state.anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote => {
        if (filter === 'ALL') {
          return true
        }
        return anecdote.content.includes(filter)
      })
  )

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </div>
  )
}

export default Anecdotes