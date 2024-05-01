import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:3001/api',
})

export default apiClient
