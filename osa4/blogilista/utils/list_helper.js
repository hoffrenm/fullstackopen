const _ = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0);

  return likes;
};

const favouriteBlog = blogs => {
  let fav = blogs[0] || null;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > fav.likes) {
      fav = blogs[i];
    }
  }

  return fav;
};

const mostBlogs = blogs => {
  const result = _(blogs)
    .countBy("author")
    .entries()
    .maxBy(_.last);

  return { author: result[0], blogs: result[1] };
};

const mostLikes = blogs => {
  const result = _(blogs)
    .groupBy("author")
    .map((objects, key) => ({
      author: key,
      likes: _.sumBy(objects, "likes") }))
    .maxBy("likes");

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
