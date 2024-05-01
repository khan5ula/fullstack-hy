const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('frontend/dist'))

let anecdotes = [
  {
    content: 'If it hurts, do it more often',
    id: '47145',
    votes: 13,
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: '21149',
    votes: 1,
  },
  {
    content:
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    id: '69581',
    votes: 2,
  },
  {
    content:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    id: '36975',
    votes: 0,
  },
  {
    content: 'Premature optimization is the root of all evil.',
    id: '25170',
    votes: 0,
  },
  {
    content:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    id: '98312',
    votes: 2,
  },
  {
    content: 'anecdote to the server',
    votes: 0,
    id: 'u6igkf0',
  },
  {
    content: 'sometimes, it smells',
    votes: 1,
    id: 'VKKDeCa',
  },
]

app.get('/anecdotes', (req, res) => {
  res.json(anecdotes)
})

app.get('/anecdotes/:id', (request, response) => {
  const id = request.params.id
  const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
  response.json(anecdote)
})

app.delete('/anecdotes/:id', (request, response) => {
  const id = request.params.id
  anecdotes = anecdotes.filter((anecdote) => anecdote.id !== id)

  response.status(200)
  response.send('Anecdote removed')
})

app.post('/anecdotes', (request, response) => {
  const id = uuidv4()
  const anecdote = {
    id: id,
    content: request.body.content,
    votes: 0,
  }
  anecdotes = anecdotes.concat(anecdote)
  response.status(200).json(anecdote)
})

app.put('/anecdotes/:id', (request, response) => {
  const id = request.params.id
  const updatedAnecdote = request.body

  const updatedAnecdotes = anecdotes.map((anecdote) => {
    if (anecdote.id === id) {
      return {
        ...anecdote,
        ...updatedAnecdote,
      }
    } else {
      return anecdote
    }
  })

  anecdotes = updatedAnecdotes

  response.json(updatedAnecdote)
})

app.get('/health', (req, res) => {
  res.send('ok')
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
