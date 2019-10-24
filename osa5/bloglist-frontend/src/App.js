import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Loginform from "./components/Loginform";
import Blogform from "./components/Blogform";
import Togglable from "./components/Togglable";
import { useField } from "./hooks/index";

const App = () => {
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
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
      const name = username.value;
      const pass = password.value;

      const user = await loginService.login({ username: name, password: pass });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      username.reset();
      password.reset();
      blogService.setToken(user.token);
    } catch (exception) {
      console.log(exception);
      handleNotification("Wrong username or password");
    }
  };

  const handleNotification = message => {
    setNotification(`${message}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleAddBlog = newBlog => {
    setBlogs(blogs.concat(newBlog));
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
    if (user) {
      return (
        <div className="blogs">
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
    }

    return <div className="blogs"></div>;
  };

  return (
    <div>
      <div>{notification !== null ? <p>{notification}</p> : " "}</div>

      <div>
        {user === null ? (
          <Togglable buttonLabel="Show login">
            <Loginform
              handleSubmit={handleLogin}
              username={username}
              password={password}
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
                addBlog={handleAddBlog}
                sendNotification={handleNotification}
              />
            </Togglable>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
