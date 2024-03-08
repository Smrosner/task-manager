import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoListComponent from "./TodoListComponent";
import * as todoAPI from "../../api/todoAPI.js";

jest.mock("../../api/todoAPI.js");

const mockTodos = [
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

describe("TodoListComponent", () => {
  beforeEach(() => {
    todoAPI.createTask.mockClear();
    todoAPI.updateSingleTask.mockClear();
  });

  it("renders without crashing", () => {
    render(<TodoListComponent todos={[]} setTodos={() => {}} />);
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("displays todos correctly", () => {
    render(<TodoListComponent todos={mockTodos} setTodos={() => {}} />);
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it('opens modal on "New Task" button click', () => {
    render(<TodoListComponent todos={[]} setTodos={() => {}} />);
    fireEvent.click(screen.getByText("New Task"));
    expect(screen.getByLabelText("Add new task")).toBeInTheDocument();
  });
});
