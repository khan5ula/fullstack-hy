const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Has {anecdote.votes} votes</p>
      for more info see <a href={`${anecdote.info}`}>{anecdote.info}</a>
      <br /><br />
    </div>
  )
}

export default Anecdote