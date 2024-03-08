import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";

jest.mock("../../api/todoAPI.js", () => ({
  deleteSingleTask: jest.fn(),
}));

describe("TodoList", () => {
  const mockToggleTodoCompletion = jest.fn();
  const mockHandleDeleteTodo = jest.fn();
  const mockHandleShowModal = jest.fn();
  const mockHandleSaveTodo = jest.fn();

  const defaultProps = {
    todos: [],
    toggleTodoCompletion: mockToggleTodoCompletion,
    title: "Test Title",
    showModal: false,
    setShowModal: jest.fn(),
    newTodoTitle: "",
    setNewTodoTitle: jest.fn(),
    newTodoDescription: "",
    setNewTodoDescription: jest.fn(),
    handleSaveTodo: mockHandleSaveTodo,
    currentTodo: null,
    handleShowModal: mockHandleShowModal,
    handleDeleteTodo: mockHandleDeleteTodo,
  };

  it("renders without todos", () => {
    render(<TodoList {...defaultProps} />);
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Complete some tasks to see them listed here/i)
    ).toBeInTheDocument();
  });

  it("renders with todos", () => {
    const todos = [
      {
        id: 1,
        title: "Test Todo 1",
        description: "Description 1",
        completed: false,
      },
      {
        id: 2,
        title: "Test Todo 2",
        description: "Description 2",
        completed: true,
      },
    ];
    render(<TodoList {...defaultProps} todos={todos} />);
    expect(screen.getByText(/Test Todo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();
  });

  it("calls handleDelete when delete button is clicked", async () => {
    const todos = [
      {
        id: 1,
        title: "Test Todo 1",
        description: "Description 1",
        completed: false,
      },
    ];
    render(<TodoList {...defaultProps} todos={todos} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    userEvent.click(deleteButton);
    await waitFor(() => expect(mockHandleDeleteTodo).toHaveBeenCalledWith(1));
  });
});
