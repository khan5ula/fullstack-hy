import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'This blog title should be rendered in all cases',
    author: 'Mr. Testerson',
    url: 'www.testurl.net',
  }

  render(<Blog blog={blog} />)

  screen.getByText('This blog title should be rendered in all cases', { exact: false })
  screen.getByText('Mr. Testerson', { exact: false })
  const url = screen.queryByText('www.testurl.net')
  expect(url).toBeNull()
})

test('additional contents show after a click', async () => {
  const blog = {
    title: 'react tests',
    author: 'Mr. Testerson',
    url: 'www.testings.com',
    likes: '5',
    user: {
      name: 'Dummy',
      username: 'dummy'
    }
  }

  const container = render(<Blog blog={blog} user={'someuser'} />).container

  const user = userEvent.setup()
  const button = screen.getByText('show')

  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('www.testings.com')
  expect(div).toHaveTextContent('likes')
  expect(div).toHaveTextContent('Dummy')
})

test('clicking like twice calls the eventHandler twice', async () => {
  const blog = {
    title: 'Like testing blog',
    author: 'Mr. Testerson',
    url: 'www.testings.com',
    likes: '5',
    user: {
      name: 'Dummy',
      username: 'dummy'
    }
  }

  const handleLike = jest.fn()
  const container = render(<Blog blog={blog} user={'someuser'} handleLike={handleLike}/>).container
  const user = userEvent.setup()
  const showButton = screen.getByText('show')

  await user.click(showButton)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('likes')

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(2)
})
