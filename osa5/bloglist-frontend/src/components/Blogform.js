import React from "react";

const Blogform = ({
  handleSubmit,
  titleField,
  authorField,
  urlField,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input value={titleField} onChange={handleTitleChange} />
        </div>
        <div>
          Author
          <input value={authorField} onChange={handleAuthorChange} />
        </div>
        <div>
          Url
          <input value={urlField} onChange={handleUrlChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Blogform;
