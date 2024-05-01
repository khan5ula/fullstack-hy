import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogDeleter = ({
  user,
  blog,
  blogs,
  setNotificationType,
  setNotificationMessage,
  setBlogs
}) => {

  const deleteButton = () => {
    /* Usernames must be unique, so comparison between usernames works */
    if (blog.user.username === user.username) {

      return (
        <button onClick={handleDelete}>remove</button>
      )
    }
    return null
  }

  const handleDelete = (event) => {
    const removedId = blog.id
    const removedTitle = blog.title
    event.preventDefault()

    if (window.confirm(`Are you sure you want to remove blog ${removedTitle}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== removedId))

          /* Inform user of successful operation */
          setNotificationType('success')
          setNotificationMessage(`blog ${removedTitle} removed`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })

        /* Inform user of error */
        .catch(error => {
          setNotificationType('error')
          if (error.response.status === 401) {
            setNotificationMessage(`deleting blog failed: not authorized to remove blog ${removedTitle}`)
          } else {
            setNotificationMessage(`deleting blog failed: ${error.response.status} ${error}`)
          }

          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  return (
    deleteButton()
  )
}

BlogDeleter.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogDeleter