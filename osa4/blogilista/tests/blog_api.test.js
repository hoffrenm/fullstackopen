const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

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

describe("Retrieving blogs from db", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());

    await Promise.all(promiseArray);
  });

  test("correct amount of blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.length).toBe(initialBlogs.length);
  });

  test("blog id is in correct format", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  describe("Saving new blogs", () => {
    test("new blog can be saved", async () => {
      const newBlog = {
        title: "Saving a new blog",
        author: "Donald Duck",
        url: "https://lol.com/",
        likes: 200
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");

      const blogTitles = response.body.map(blog => blog.title);

      expect(response.body.length).toBe(initialBlogs.length + 1);
      expect(blogTitles).toContain("Saving a new blog");
    });

    test("blog with no likes defaults to zero", async () => {
      const newBlog = {
        title: "Blog without likes",
        author: "Donald Duck",
        url: "https://lel.com/"
      };

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body.likes).toBeDefined();
      expect(response.body.likes).toBe(0);
    });

    test("blog without title and url is rejected", async () => {
      const invalidBlog = {
        author: "Donald Duck",
        likes: 400
      };

      await api
        .post("/api/blogs")
        .send(invalidBlog)
        .expect(400);

      const response = await api.get("/api/blogs");

      expect(response.body.length).toBe(initialBlogs.length);
    });
  });

  describe("Deleting blog", () => {
    test("newly added blog can be deleted by id", async () => {
      const newBlog = {
        title: "To be deleted",
        url: "123",
        author: "Donald Duck",
        likes: 400
      };

      const savedBlog = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201);

      let response = await api.get("/api/blogs");
      let blogTitles = response.body.map(blog => blog.title);

      expect(response.body.length).toBe(initialBlogs.length + 1);
      expect(blogTitles).toContain("To be deleted");

      await api
        .delete(`/api/blogs/${savedBlog.body.id}`)
        .expect(204);

      response = await api.get("/api/blogs");

      expect(response.body.length).toBe(initialBlogs.length);
    });
  });

  describe("Updating blog", () => {
    test("existing blog can be modified", async () => {
      let response = await api.get("/api/blogs");

      const modifiedBlog = { ...response.body[0], title: "Modified" };

      await api
        .put(`/api/blogs/${modifiedBlog.id}`)
        .send(modifiedBlog)
        .expect(204);

      response = await api.get("/api/blogs")

      const blogTitles = response.body.map(blog => blog.title)

      expect(blogTitles).toContain("Modified")
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
