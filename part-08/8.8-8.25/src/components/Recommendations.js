import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Badge, Table } from 'react-bootstrap'
import { ALL_BOOKS, ME } from '../queries'
import Loading from './Loading'

const Recommendations = () => {
  const meResult = useQuery(ME)
  const [me, setMe] = useState(null)

  useEffect(() => {
    if (meResult.data) {
      setMe(meResult.data.me)
    }
  }, [meResult.data])

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genres: meResult.data?.me?.favoriteGenre },
  })

  if (meResult.loading || booksResult.loading || me === null) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  const bookRecommendations = booksResult.data.allBooks

  return (
    <div>
      <hr style={{ marginTop: '30px' }} />
      <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>
        Recommended for you
      </h3>
      <div>
        Book recommendations from your favorite genre {me.favoriteGenre}
      </div>
      <Table striped bordered hover style={{ marginTop: '20px' }}>
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
          {bookRecommendations.map((b) => (
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
    </div>
  )
}

export default Recommendations
