import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleUpdate, handleDelete, showDelete }) => {
  const [visible, setVisible] = useState(false);

  const addLike = async event => {
    event.preventDefault();

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    };

    try {
      let response = await blogService.update(blog.id, updatedBlog);
      response = { ...response, user: blog.user };
      handleUpdate(response);
    } catch (exception) {
      console.log("Error while liking");
    }
  };

  const removeBlog = async event => {
    event.preventDefault();

    try {
      await blogService.remove(blog.id);
      handleDelete(blog);
    } catch (exception) {
      console.log("Error while deleting");
    }
  };

  const showDetails = { display: visible ? "" : "none" };

  const blogStyle = {
    padding: "10px 0px 5px 0px",
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const removeButton = () => {
    console.log(showDelete);

    if (showDelete) {
      return (
        <button type="button" onClick={removeBlog}>
          Remove
        </button>
      );
    }

    return <div></div>;
  };

  return (
    <div onClick={() => setVisible(!visible)} style={blogStyle}>
      {blog.title} {blog.author}
      <div style={showDetails}>
        <a href={blog.url}>{blog.url}</a>
        <div onClick={e => e.stopPropagation()}>
          <p>
            {blog.likes} likes{" "}
            <button type="button" onClick={addLike}>
              Like
            </button>
          </p>
        </div>
        <p>Added by {blog.user.name}</p>
        {removeButton()}
      </div>
    </div>
  );
};

export default Blog;
