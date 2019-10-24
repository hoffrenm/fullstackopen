const blogs = [
  {
    id: "5db0a6b002423e0b9cff2331",
    title: "How to test a react app",
    author: "Tom Test",
    url: "12345",
    user: "5daf0dfa9aa4a905b812b751",
    likes: 4
  },
  {
    id: "5db0a6e202423e0b9cff2332",
    title: "Another blog about tests",
    author: "Tom Test",
    url: "6789",
    user: "5daf0dfa9aa4a905b812b751",
    likes: 1
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

// add dummy function for tests
const setToken = () => {};

export default { getAll, setToken };
