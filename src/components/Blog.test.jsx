import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

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
  const likes = screen.queryByText('999')
  expect(likes).toBeNull()
  const url = screen.queryByText('foo.bar')
  expect(url).toBeNull()
})