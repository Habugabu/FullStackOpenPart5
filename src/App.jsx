import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Users from "./components/Users";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchdata = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const blogsCopy = [...blogs];
    blogsCopy.sort((a, b) => b.likes - a.likes);
    if (JSON.stringify(blogs) !== JSON.stringify(blogsCopy)) {
      setBlogs(blogsCopy);
    }
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      dispatch(
        setNotification(
          { text: `Logged in as ${user.name}`, type: "success" },
          5,
        ),
      );
    } catch (exception) {
      dispatch(
        setNotification({ text: "Invalid credentials", type: "error" }, 5),
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBloglistUser");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const addBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(createdBlog));
      dispatch(
        setNotification(
          {
            text: `Added a new blog: ${blog.title} by ${blog.author}`,
            type: "success",
          },
          5,
        ),
      );
    } catch {
      dispatch(
        setNotification({ text: "Adding blog failed", type: "error" }, 5),
      );
    }
  };

  const handleLike = async (event) => {
    const id = event.target.id;
    const index = blogs.findIndex((b) => b.id === id);
    const blog = blogs[index];
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(likedBlog, likedBlog.id);
    const copy = [...blogs];
    copy[index] = updatedBlog;
    setBlogs(copy);
  };

  const handleDelete = async (event) => {
    const blog = blogs.find((b) => b.id === event.target.id);
    if (confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        dispatch(
          setNotification(
            {
              text: `Removed ${blog.title} by ${blog.author}`,
              type: "success",
            },
            5,
          ),
        );
      } catch {
        dispatch(
          setNotification(
            {
              text: `${blog.title} is already removed from the server`,
              type: "error",
            },
            5,
          ),
        );
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          onLogin={handleLogin}
          onPasswordChange={handlePasswordChange}
          onUsernameChange={handleUsernameChange}
        />
      </div>
    );
  }

  return (
    <Router>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in<button onClick={handleLogout}>log out</button>
      </p>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm addBlog={addBlog} />
              </Togglable>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  user={user}
                  blog={blog}
                  onLike={handleLike}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          }
        />
        <Route path="/users" element={<Users blogs={blogs} />} />
      </Routes>
    </Router>
  );
};

export default App;
