const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end();
  }

  const blog = new Blog({ ...request.body, likes: request.body.likes || 0 });

  try {
    const result = await blog.save();
    response.status(201).json(result.toJSON());
  } catch (exception) {}
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {}
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = { ...request.body };

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.status(204).json(result.toJSON());
  } catch (exception) {}
});

module.exports = blogsRouter;
