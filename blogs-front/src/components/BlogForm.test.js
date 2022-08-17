import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BlogForm } from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("lomake kutsuu propseina saamaansa takaisinkutsufunktiota\
oikeilla tiedoilla siinä vaiheessa kun blogi luodaan.", async () => {
  const user = userEvent.setup();

  const addBlogHandler = jest.fn();

  render(<BlogForm addBlog={addBlogHandler} />);
  const addButton = screen.getByText("add new blog");
  await user.click(addButton);
  await user.type(screen.getByPlaceholderText("title"), "titletest");
  await user.type(screen.getByPlaceholderText("author"), "authortest");
  await user.type(screen.getByPlaceholderText("url"), "urltest");

  const sendButton = screen.getByText("save");
  await user.click(sendButton);

  expect(addBlogHandler.mock.calls).toHaveLength(1);
  expect(addBlogHandler.mock.calls[0][0].newTitle).toBe("titletest");
  expect(addBlogHandler.mock.calls[0][0].newAuthor).toBe("authortest");
  expect(addBlogHandler.mock.calls[0][0].newUrl).toBe("urltest");
});
