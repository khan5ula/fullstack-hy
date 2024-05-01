import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Notification from './Notification'

test('notification has a proper message and type', async () => {

  /* Test success type */
  render(<Notification type='success' message='This notification was successful' />)
  screen.getByText('This notification was successful', { exact: false } )
  const successes = await screen.findAllByText('success', { exact: false } )
  expect(successes[0]).toHaveClass('success')

  /* Test failure type */
  render(<Notification type='failure' message='This notification informs about a failure' />)
  screen.getByText('This notification informs about a failure', { exact: false } )
  const failures = await screen.findAllByText('failure', { exact: false } )
  expect(failures[0]).toHaveClass('failure')
  screen.debug()
})