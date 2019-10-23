import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Loginform from "./components/Loginform";
import Blogform from "./components/Blogform";
import Togglable from "./components/Togglable";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.removeToken();
    setUser(null);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
    } catch (exception) {
      setNotification("Wrong username or password");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const addBlog = event => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    blogService
      .create(newBlog)
      .then(response => {
        setBlogs(blogs.concat(response));
        setTitle("");
        setUrl("");
        setAuthor("");

        setNotification(`Created '${response.title}' by ${response.author}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch(exception => {
        setNotification("Error creating a blog, check fields");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const handleUpdate = updatedBlog => {
    setBlogs(
      blogs.map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    );
  };

  const handleDelete = deletedBlog => {
    setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id));
  };

  const allBlogs = () => {
    return (
      <div>
        {blogs
          .sort((a, b) => b.likes > a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              showDelete={blog.user.username === user.username}
            />
          ))}
      </div>
    );
  };

  return (
    <div>
      <div>{notification !== null ? <p>{notification}</p> : " "}</div>

      <div>
        {user === null ? (
          <Togglable buttonLabel="Show login">
            <Loginform
              handleSubmit={handleLogin}
              usernameField={username}
              passwordField={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
          </Togglable>
        ) : (
          <div>
            <h1>Blogs</h1>
            <p>
              Logged in as `{user.name}`
              <button onClick={handleLogout}>Logout</button>
            </p>
            {allBlogs()}
            <Togglable buttonLabel="Add blog">
              <Blogform
                handleSubmit={addBlog}
                titleField={title}
                authorField={author}
                urlField={url}
                handleTitleChange={({ target }) => setTitle(target.value)}
                handleAuthorChange={({ target }) => setAuthor(target.value)}
                handleUrlChange={({ target }) => setUrl(target.value)}
              />
            </Togglable>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
