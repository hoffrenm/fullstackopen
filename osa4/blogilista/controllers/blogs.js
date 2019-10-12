const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end();
  }

  try {
    const users = await User.find({});

    const user = users[0];

    const blog = new Blog({
      ...request.body,
      user: user.id,
      likes: request.body.likes || 0
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id)

    await user.save()

    response.json(result.toJSON());
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
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });
    response.json(result.toJSON());
  } catch (exception) {}
});

module.exports = blogsRouter;
