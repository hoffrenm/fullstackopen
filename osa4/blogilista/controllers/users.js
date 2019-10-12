const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
    const users = await User.find({}).populate("blogs", { title: 1, url: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (body.username.length > 2 && body.password.length > 2) {
        const usernameInUse = await User.findOne({ username: body.username });

        if (usernameInUse) {
            return response.status(400).json({ error: "username is already in use"})
        }
    } else {
        return response.status(400).json({ error: "username and password should be atleast 3 digits long"})
    }
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
