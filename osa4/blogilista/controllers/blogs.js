const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response, next) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end();
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      ...request.body,
      user: user.id,
      likes: request.body.likes || 0
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);

    await user.save();

    response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: "unauthorized user"});
    }

    await blog.remove();
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = { ...request.body };

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });
    response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
