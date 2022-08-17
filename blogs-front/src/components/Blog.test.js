import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Blog } from "./Blog";
import userEvent from "@testing-library/user-event";

import app from "../App";

test("renders content", () => {
  const blog = {
    author: "Pertti",
    title: "Irmelin salaiset päiväkirjat",
    url: "www.irmelidiaries.com",
  };

  // render(<Notification message="asdf" style="error" />);
  const { container } = render(
    <Blog blog={blog} handleLike={app.addLike} isOwner={true} />
  );
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Pertti");
  expect(div).toHaveTextContent("Irmelin salaiset päiväkirjat");
  expect(div).not.toHaveTextContent("www.irmelidiaries.com");
  expect(div).not.toHaveTextContent("likes:");
  // screen.debug();
  // const element = screen.getByText("Irmelin salaiset päiväkirjat");
  // expect(element).toBeDefined();
});

test("clicking the button shows all of the blog's data", async () => {
  const blog = {
    author: "Pertti",
    title: "Irmelin salaiset päiväkirjat",
    url: "www.irmelidiaries.com",
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} handleLike={mockHandler} isOwner={true} />
  );

  const user = userEvent.setup();
  let button = screen.getByText("view");
  await user.click(button);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("www.irmelidiaries.com");
  expect(div).toHaveTextContent("likes:");
  button = screen.getByText("like");
  await user.click(button);
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
