import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

afterEach(cleanup);

test("renders content", () => {
  const blog = {
    title: "Testing a simple blog",
    author: "Donald Duck",
    url: "123",
    likes: 4
  };

  const component = render(<SimpleBlog blog={blog} />);

  const div = component.container.querySelector(".blog");
  expect(div).toHaveTextContent("Testing a simple blog");
  expect(div).toHaveTextContent("Donald Duck");
  expect(div).toHaveTextContent("blog has 4 likes");
});

test("Clicking like button twice causes func handler to be called twice", () => {
  const blog = {
    title: "Testing a simple blog",
    author: "Donald Duck",
    url: "123"
  };

  const mockHandler = jest.fn();

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

  const button = component.container.querySelector(".likeButton");

  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
