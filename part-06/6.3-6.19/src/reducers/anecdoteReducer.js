import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    create: (state, action) => {
      state.push(action.payload)
    },
    increment: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find((n) => n.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes++
      }
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  }
})

export const { create, increment, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const NewAnecdote = await anecdoteService.createNew(content)
    dispatch(create(NewAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find((n) => n.id === id)
    if (anecdoteToVote) {
      anecdoteToVote.votes++
    }
    await anecdoteService.update(id, anecdoteToVote)
    dispatch(increment(id))
  }
}

export default anecdoteSlice.reducer