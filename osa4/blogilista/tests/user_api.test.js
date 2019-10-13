const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const api = supertest(app);

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      username: "root",
      name: "Ro Juut",
      password: "sekret"
    });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(helper.newuser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(helper.newuser.username);
  });

  describe("fails when", () => {
    test("dublicate username", async () => {
      const existingUser = {
        username: "root",
        name: "Ro Juut",
        password: "sekret"
      };

      await api
        .post("/api/users")
        .send(existingUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("invalid username", async () => {
      await api
        .post("/api/users")
        .send(helper.invalidUsername)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("invalid password", async () => {
      await api
        .post("/api/users")
        .send(helper.invalidPassword)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
