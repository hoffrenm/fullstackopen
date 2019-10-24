import React from "react";
import PropTypes from "prop-types";
import { useField } from "../hooks/index";
import blogService from "../services/blogs";

const Blogform = ({ addBlog, sendNotification }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const createBlog = async event => {
    event.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    try {
      const response = await blogService.create(newBlog);
      title.reset();
      author.reset();
      url.reset();
      addBlog(response);
      sendNotification(`Created '${response.title}' by ${response.author}`);
    } catch (exception) {
      console.log(exception);
      sendNotification("Error creating a blog, check fields");
    }
  };

  return (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={createBlog}>
        <div>
          Title
          <input {...title} reset={null} />
        </div>
        <div>
          Author
          <input {...author} reset={null} />
        </div>
        <div>
          Url
          <input {...url} reset={null} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};


Blogform.propTypes = {
  addBlog: PropTypes.func.isRequired,
  sendNotification: PropTypes.func.isRequired
  // titleField: PropTypes.string.isRequired,
  // authorField: PropTypes.string.isRequired,
  // urlField: PropTypes.string.isRequired,
  // handleTitleChange: PropTypes.func.isRequired,
  // handleAuthorChange: PropTypes.func.isRequired,
  // handleUrlChange: PropTypes.func.isRequired,
  // handleSubmit: PropTypes.func.isRequired
};

export default Blogform;
