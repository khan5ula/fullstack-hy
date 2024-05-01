import { useApolloClient } from '@apollo/client'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Recommendations from './Recommendations'

const Home = ({ token, setToken }) => {
  const client = useApolloClient()
  const navigate = useNavigate()

  const username = localStorage.getItem('username')

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/login')
    window.location.reload()
  }

  return (
    <Container>
      <h1 style={{ marginBottom: '20px' }}>Home</h1>
      Logged in as 🥸 {username}
      <Button
        size="sm"
        style={{ marginLeft: '15px' }}
        variant="outline-danger"
        onClick={logout}
      >
        Logout
      </Button>
      <Recommendations />
    </Container>
  )
}

export default Home
