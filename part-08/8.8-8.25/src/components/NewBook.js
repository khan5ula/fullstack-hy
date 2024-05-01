import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { updateCache } from '../App'
import { ALL_BOOKS, ALL_GENRES, CREATE_BOOK } from '../queries'

const NewBook = ({ setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState([])
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: { query: ALL_GENRES },
    onError: (error) => {
      setMessage('Error occured while adding the book')
      console.log(JSON.stringify(error))
    },
    update: (cache, { data }) => {
      const { addBook: addedBook } = data
      const { author } = addedBook
      updateCache(cache, ALL_BOOKS, addedBook, author)
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    await createBook({
      variables: { title, published: parseInt(published), author, genres },
    })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <Container>
      <h1 style={{ marginBottom: '20px' }}>Add a new book</h1>
      <Form onSubmit={submit}>
        <Form.Group>
          <FloatingLabel label="Title" className="mb-2">
            <Form.Control
              placeholder="Big Book of Examples"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Author" className="mb-2">
            <Form.Control
              placeholder="Mr./Mrs. Writer Typewriterson"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Published" className="mb-2">
            <Form.Control
              placeholder="1901"
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Add genre to the list" className="mb-2">
            <Form.Control
              placeholder="crime"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </FloatingLabel>
          <Button variant="primary" size="sm" onClick={addGenre} type="button">
            add genre
          </Button>
          <div style={{ marginTop: '15px' }}>genres: {genres.join(', ')}</div>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
          Create book
        </Button>
      </Form>
    </Container>
  )
}

export default NewBook
