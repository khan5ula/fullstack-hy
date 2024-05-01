import axios from 'axios'

const baseUrl = '/api/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, update, remove }
