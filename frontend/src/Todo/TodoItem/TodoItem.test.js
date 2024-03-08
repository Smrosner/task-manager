import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";

test("displays the correct todo item title and description", () => {
  const todo = {
    id: 1,
    title: "Test Todo",
    description: "Test Description",
    completed: false,
  };
  render(<TodoItem todo={todo} />);

  const titleElement = screen.getByText(todo.title);
  const descriptionElement = screen.getByText(todo.description);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
