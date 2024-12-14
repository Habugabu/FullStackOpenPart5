import {useState} from 'react'

const Blog = ({ user, blog, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const deletable = { display: user.id === blog.user._id ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <i>{blog.title}</i> {blog.author}
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes: {blog.likes}
        <button 
          onClick={onLike}
          id={blog.id}
        >like</button><br />
        {blog.user.name}<br />
        <button style={deletable} onClick={onDelete} id={blog.id}>delete</button>
      </div>
    </div>
  )
}

export default Blog