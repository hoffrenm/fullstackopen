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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
