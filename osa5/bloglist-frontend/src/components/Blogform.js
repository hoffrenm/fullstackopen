import React from "react";
import PropTypes from "prop-types";

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

Blogform.propTypes = {
  titleField: PropTypes.string.isRequired,
  authorField: PropTypes.string.isRequired,
  urlField: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Blogform;
