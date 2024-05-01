import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogCreator from './BlogCreator'
import userEvent from '@testing-library/user-event'

test('blog creator receives correct information', () => {
  const setBlogs = jest.fn()

  render(<BlogCreator setBlogs={setBlogs} />)

  const title = screen.getByPlaceholderText('blog title')
  const author = screen.getByPlaceholderText('blog author')
  const url = screen.getByPlaceholderText('blog url')
  const submitButton = screen.getByText('create')

  userEvent.type(title, 'Big blog of worms')
  userEvent.type(author, 'John Doe')
  userEvent.type(url, 'https://www.worm-lover.biz')
  userEvent.click(submitButton)

  console.log(setBlogs.mock.calls)
})