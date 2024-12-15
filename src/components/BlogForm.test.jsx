import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('BlogForm calls event handler with correct details when creating blog', async () => {
  const addBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(input[0], 'testing')
  await user.type(input[1], 'a')
  await user.type(input[2], 'form')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing')
  expect(addBlog.mock.calls[0][0].author).toBe('a')
  expect(addBlog.mock.calls[0][0].url).toBe('form')
})