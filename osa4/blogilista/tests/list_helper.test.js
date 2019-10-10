const listHelper = require("../utils/list_helper");

const blogs = [
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
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test(" of empty list equals 0", () => {
    const testResult = listHelper.totalLikes([]);
    expect(testResult).toBe(0);
  });

  test(" of singe blog equals its likes", () => {
    const testResult = listHelper.totalLikes(blogs.slice(3, 4));
    expect(testResult).toBe(10);
  });

  test(" of all blogs is correct", () => {
    const testResult = listHelper.totalLikes(blogs);
    expect(testResult).toBe(36);
  });
});

describe("favourite blog", () => {
  test("of empty list is null", () => {
    const testResult = listHelper.favouriteBlog([]);
    expect(testResult).toBe(null);
  });

  test("of all is the one with most likes", () => {
    const testResult = listHelper.favouriteBlog(blogs);
    expect(testResult).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    });
  });
});
