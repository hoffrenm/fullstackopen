import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Blogform from "./components/Blogform";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

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

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = event => {
    setAuthor(event.target.value);
  };

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

  const loginForm = () => {
    return (
      <div>
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password{" "}
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  const addBlog = event => {
    event.preventDefault();
    console.log("Tallennetaan");

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

  const allBlogs = () => {
    return (
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>{notification !== null ? <p>{notification}</p> : " "}</div>

      <div>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <h1>Blogs</h1>
            <p>Logged in as `{user.name}`</p>
            <button onClick={handleLogout}>Logout</button>
            {allBlogs()}
            <Blogform
              handleSubmit={addBlog}
              titleField={title}
              authorField={author}
              urlField={url}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
