import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = ({ token }) => {
  const padding = {
    paddingLeft: 10,
  }

  return (
    <Container>
      <Navbar style={{ marginBottom: '30px' }} bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>Library</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={token ? '/home' : '/login'} as="span">
              <Link style={padding} to={token ? 'home' : 'login'}>
                {token ? 'Home' : 'Login'}
              </Link>
            </Nav.Link>
            <Nav.Link href="/" as="span">
              <Link style={padding} to="/">
                Authors
              </Link>
            </Nav.Link>
            <Nav.Link href="/books" as="span">
              <Link style={padding} to="/books">
                Books
              </Link>
            </Nav.Link>
            {token && (
              <Nav.Link href="/add-book" as="span">
                <Link style={padding} to="/add-book">
                  New Book
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </Container>
  )
}

export default Menu
