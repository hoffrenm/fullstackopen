const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(note => blog.toJSON());
};

const newBlog = {
  title: "Saving a new blog",
  author: "Donald Duck",
  url: "https://lol.com/",
  likes: 200
};

const invalidBlog = {
  author: "Donald Duck",
  likes: 400
};

const noLikes = {
  title: "Blog without likes",
  author: "Donald Duck",
  url: "https://lel.com/"
};

module.exports = {
  initialBlogs,
  blogsInDb,
  newBlog,
  invalidBlog,
  noLikes
};
