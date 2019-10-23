import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

afterEach(cleanup);

const blog = {
  title: "Testing a blog",
  author: "Donald Duck",
  url: "123",
  likes: 4,
  user: {
    id: 1,
    name: "Testaaja",
    username: "test"
  }
};

test("Additional content is hidden by default", () => {
  const component = render(<Blog blog={blog} />);

  const div = component.container.querySelector(".blog");
  const details = component.container.querySelector(".details");

  expect(div).toHaveTextContent("Testing a blog");
  expect(div).toHaveTextContent("Donald Duck");

  expect(details).not.toBeVisible();
});

test("Clicking a box reveals additional information", () => {
  const component = render(<Blog blog={blog} />);

  const div = component.container.querySelector(".blog");
  const details = component.container.querySelector(".details");

  expect(div).toHaveTextContent("Testing a blog");
  expect(div).toHaveTextContent("Donald Duck");

  expect(details).not.toBeVisible();

  fireEvent.click(div);

  expect(details).toBeVisible();
  expect(details).toHaveTextContent("4 likes");
  expect(details).toHaveTextContent("Added by Testaaja");
});
