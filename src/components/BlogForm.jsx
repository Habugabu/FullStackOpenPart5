import { useState } from 'react'

const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        addBlog({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>
                    title:
                    <input
                        type='text'
                        value={title}
                        name='Title'
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        type='text'
                        value={author}
                        name='Author'
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        type='text'
                        value={url}
                        name='URL'
                        onChange={handleUrlChange}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm