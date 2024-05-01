import { useEffect, useState, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogCreator from './components/BlogCreator'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      /* Inform user of successful operation */
      setNotificationType('success')
      setNotificationMessage(`${user.name} logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      console.log(`${user.name} logged in`)
      setUsername('')
      setPassword('')

      /* Inform user of error */
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    console.log(`Logging out user: ${user.name}`)
    setUser(null)

    /* Inform user of successful operation */
    setNotificationType('success')
    setNotificationMessage(`${user.name} logged out`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, updatedBlog)
      .then(updatedBlog => {
        const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
        setBlogs(updatedBlogs.sort((blogA, blogB) => blogB.likes - blogA.likes))

        /* Inform user of successful operation */
        setNotificationType('success')
        setNotificationMessage(`liked blog: ${blog.title}, ${blog.author}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })

      /* Inform user of error */
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(`updating blog likes failed: ${error}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const blogCreatorRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification type={notificationType} message={notificationMessage} />
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification type={notificationType} message={notificationMessage} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        {' '}
        <button id='logout-button' onClick={handleLogout}>logout</button>
        <br />
      </p>

      {/* Toggle visible functionality for blog adding */}
      <Togglable buttonLabel="create new blog" ref={blogCreatorRef} id="create-new-blog-button">
        <BlogCreator
          setBlogs={setBlogs}
          blogs={blogs}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType}
          user={user}
        />
      </Togglable>
      <br />

      {/* Print blogs from the database */}
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
        />
      )}
    </div>
  )
}

export default App