import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('renders only title and author before expanded', () => {

  const user = {
    id: '123',
    name: 'me',
    username: 'hello'
  }
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Haskell Curry',
    likes: 999,
    url: 'foo.bar',
    user: { ...user }
  }


  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'Haskell Curry'
  )
  const likes = screen.queryByText(/likes/)
  expect(likes).toHaveStyle('display: none')
  const url = screen.queryByText(/foo.bar/)
  expect(url).toHaveStyle('display: none')
})

test('renders likes and url after clicking expand button', async () => {

  const user = {
    id: '123',
    name: 'me',
    username: 'hello'
  }
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Haskell Curry',
    likes: 999,
    url: 'foo.bar',
    user: { ...user }
  }

  render(<Blog blog={blog} user={user} />)

  const testUser = userEvent.setup()
  const button = screen.getByText('view')
  await testUser.click(button)

  const url = screen.getByText(/foo.bar/)
  expect(url).not.toHaveStyle('display: none')
  const likes = screen.getByText(/likes:/)
  expect(likes).not.toHaveStyle('display: none')

})

test('clicking like button twice calls event handler twice', async () => {

  const user = {
    id: '123',
    name: 'me',
    username: 'hello'
  }
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Haskell Curry',
    likes: 999,
    url: 'foo.bar',
    user: { ...user }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} onLike={mockHandler}/>)

  const testUser = userEvent.setup()
  const button = screen.getByText('like')
  await testUser.click(button)
  await testUser.click(button)

  expect(mockHandler).toBeCalledTimes(2)
})