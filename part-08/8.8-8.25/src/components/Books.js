import { useQuery } from '@apollo/client'
import {
  Container,
  Table,
  ButtonGroup,
  ToggleButton,
  Row,
  Badge,
} from 'react-bootstrap'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import Loading from './Loading'
import { useState, useEffect } from 'react'

const Books = () => {
  const [checkedGenres, setCheckedGenres] = useState([])

  const selectedGenres = Object.keys(checkedGenres).filter(
    (genre) => checkedGenres[genre]
  )

  const allGenresSelected = Object.values(checkedGenres).every(
    (isChecked) => isChecked
  )

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genres: selectedGenres },
  })

  const genresResult = useQuery(ALL_GENRES)

  useEffect(() => {
    if (genresResult.data) {
      const genres = genresResult.data.allGenres
      const initialCheckedGenres = {}
      genres.forEach((g) => {
        initialCheckedGenres[g] = true
      })
      setCheckedGenres(initialCheckedGenres)
    }
  }, [genresResult.data])

  if (booksResult.loading || genresResult.loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  const books = booksResult.data.allBooks
  const genres = genresResult.data.allGenres

  const handleToggle = (genre) => {
    setCheckedGenres((state) => ({
      ...state,
      [genre]: !state[genre],
    }))
  }

  const handleToggleAllGenres = () => {
    setCheckedGenres((state) => {
      const allChecked = Object.values(state).every((isChecked) => isChecked)
      const updatedState = {}

      for (const genre of genres) {
        updatedState[genre] = !allChecked
      }

      return updatedState
    })
  }

  return (
    <Container>
      <h1 style={{ marginBottom: '20px' }}>Books</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <h3>Title</h3>
            </th>
            <th>
              <h3>Author</h3>
            </th>
            <th>
              <h3>Published</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.title}>
              <td className="text-left">
                <div style={{ marginBottom: '10px' }}>{b.title}</div>
                {b.genres.map((genre, index) => (
                  <Badge
                    key={genre}
                    pill
                    bg="light"
                    text="dark"
                    className="me-2 mb-2"
                  >
                    {genre}
                  </Badge>
                ))}
              </td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr style={{ marginTop: '30px' }} />
      <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>Genres</h3>
      <Row className="justify-content-center">
        <Container>
          <ButtonGroup className="mb-2">
            <ToggleButton
              style={{ marginRight: '5px' }}
              id={`toggle-all-genres`}
              size="sm"
              type="checkbox"
              variant="link"
              checked={Object.values(checkedGenres).every(
                (isChecked) => isChecked
              )}
              onChange={handleToggleAllGenres}
            >
              {allGenresSelected ? 'deselect all' : 'select all'}
            </ToggleButton>
          </ButtonGroup>
          {genres.length > 0 &&
            genres.map((g) => (
              <ButtonGroup className="mb-2" key={g}>
                <ToggleButton
                  style={{ marginRight: '5px' }}
                  id={`toggle-check-${g}`}
                  size="sm"
                  type="checkbox"
                  variant="outline-primary"
                  checked={checkedGenres[g]}
                  onChange={() => handleToggle(g)}
                >
                  {g}
                </ToggleButton>
              </ButtonGroup>
            ))}
        </Container>
      </Row>
    </Container>
  )
}

export default Books
