import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("login is rendered by default", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelectorAll(".blogs"));

    const blogs = component.container.querySelectorAll(".blog");

    expect(blogs.length).toBe(0);
    expect(component.container).toHaveTextContent("Login");
    expect(component.container).not.toHaveTextContent(
      "How to test a react app"
    );
    expect(component.container).not.toHaveTextContent("Tom Test");
  });

  test("blogs are rendered to logged in user", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    };

    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelectorAll(".blogs"));

    const blogs = component.container.querySelectorAll(".blog");

    expect(blogs.length).toBe(2);
    expect(component.container).toHaveTextContent("How to test a react app");
    expect(component.container).toHaveTextContent("Another blog about tests");
    expect(component.container).toHaveTextContent("Tom Test");
    expect(component.container).not.toHaveTextContent("Login");
  });
});
