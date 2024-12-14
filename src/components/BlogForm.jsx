import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setNotification, addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = {
                title: title,
                author: author,
                url: url
            }
            const createdBlog = await blogService.create(newBlog)
            addBlog(createdBlog)
            setTitle('')
            setAuthor('')
            setUrl('')
            setNotification({text: `Added a new blog: ${newBlog.title} by ${newBlog.author}`, type: 'success'})      
            setTimeout(() => {        
                setNotification({text: '', type: ''})
            }, 5000)
        } catch {
            setNotification({text: 'Adding blog failed (details missing)', type: 'error'})      
            setTimeout(() => {        
                setNotification({text: '', type: ''})
            }, 5000)
        }
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