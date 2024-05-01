import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Button, Container, FloatingLabel, Form, Table } from 'react-bootstrap'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Loading from './Loading'

const Authors = ({ setMessage }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message)
    },
  })

  const submitEditAuthor = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name, setBornTo: parseInt(year) },
    })
    setName('')
    setYear('')
  }

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  const authors = result.data.allAuthors

  return (
    <Container>
      <h1 style={{ marginBottom: '20px' }}>Authors</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <h3>Author</h3>
            </th>
            <th>
              <h3>Born</h3>
            </th>
            <th>
              <h3>Books</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr style={{ marginTop: '30px' }} />
      <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>Set birthyear</h3>

      <Form onSubmit={submitEditAuthor}>
        <Form.Group>
          <Form.Select
            className="mb-2"
            aria-label="name"
            onChange={({ target }) => setName(target.value)}
          >
            <option>Select author</option>
            {authors.map((author, index) => (
              <option key={index} value={author.name}>
                {author.name}
              </option>
            ))}
          </Form.Select>
          <FloatingLabel label="year" className="mb-2">
            <Form.Control
              placeholder="1969"
              value={year}
              type="number"
              onChange={({ target }) => setYear(target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
          Update author
        </Button>
      </Form>
    </Container>
  )
}

export default Authors
