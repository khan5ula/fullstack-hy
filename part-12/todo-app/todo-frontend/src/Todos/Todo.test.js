import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders a todo", () => {
  const todo = {
    text: "Do some testing",
    done: false,
  };

  render(<Todo todo={todo} />);

  const todoText = screen.getByText("Do some testing");
  expect(todoText).toBeDefined();
  const todoNotDone = screen.getByText("This todo is not done");
  expect(todoNotDone).toBeDefined();
});
