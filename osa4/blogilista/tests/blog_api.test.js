const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper")
const api = supertest(app);

describe("Retrieving blogs from db", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());

    await Promise.all(promiseArray);
  });

  test("correct amount of blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test("blog id is in correct format", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  describe("Saving new blogs", () => {
    test("new blog can be saved", async () => {
      await api
        .post("/api/blogs")
        .send(helper.newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");

      const blogTitles = response.body.map(blog => blog.title);

      expect(response.body.length).toBe(helper.initialBlogs.length + 1);
      expect(blogTitles).toContain("Saving a new blog");
    });

    test("blog with no likes defaults to zero", async () => {
      const response = await api
        .post("/api/blogs")
        .send(helper.noLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body.likes).toBeDefined();
      expect(response.body.likes).toBe(0);
    });

    test("blog without title and url is rejected", async () => {
      await api
        .post("/api/blogs")
        .send(helper.invalidBlog)
        .expect(400);

      const response = await api.get("/api/blogs");

      expect(response.body.length).toBe(helper.initialBlogs.length);
    });
  });

  describe("Deleting blog", () => {
    test("newly added blog can be deleted by id", async () => {
      const savedBlog = await api
        .post("/api/blogs")
        .send(helper.newBlog)
        .expect(201);

      let response = await api.get("/api/blogs");
      let blogTitles = response.body.map(blog => blog.title);

      expect(response.body.length).toBe(helper.initialBlogs.length + 1);
      expect(blogTitles).toContain("Saving a new blog");

      await api
        .delete(`/api/blogs/${savedBlog.body.id}`)
        .expect(204);

      response = await api.get("/api/blogs");

      expect(response.body.length).toBe(helper.initialBlogs.length);
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
