import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ setMessage, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message)
    },
    onCompleted: () => {
      localStorage.setItem('username', username)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
      navigate('/home')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Group>
          <FloatingLabel label="Username" className="mb-2">
            <Form.Control
              type="text"
              placeholder="username"
              name="username"
              value={username}
              id="username-form"
              onChange={({ target }) => setUsername(target.value)}
              style={{ marginBottom: '10px' }}
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-2">
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              value={password}
              id="password-form"
              onChange={({ target }) => setPassword(target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default LoginForm
