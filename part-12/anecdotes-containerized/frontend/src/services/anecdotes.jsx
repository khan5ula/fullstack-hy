import axios from '../util/apiClient'

const getAll = async () => {
  const response = await axios.get('/anecdotes')
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post('/anecdotes', object)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`anecdotes/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = async (id) => {
  const request = await axios.delete(`anecdotes/${id}`)
  return request.data
}

export default { getAll, createNew, update, remove }
