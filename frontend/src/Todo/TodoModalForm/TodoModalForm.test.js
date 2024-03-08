import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoModalForm from "./TodoModalForm";
import { act } from "react-dom/test-utils";

describe("TodoModalForm", () => {
  const mockHandleSaveTodo = jest.fn();

  const Wrapper = ({ currentTodo }) => {
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    return (
      <TodoModalForm
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        newTodoDescription={newTodoDescription}
        setNewTodoDescription={setNewTodoDescription}
        handleSaveTodo={mockHandleSaveTodo}
        firstInputRef={() => {}}
        currentTodo={currentTodo || {}}
      />
    );
  };

  test("renders TodoModalForm component with necessary fields and submit button", () => {
    render(<Wrapper />);
    expect(screen.getByLabelText(/title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit|update/i })
    ).toBeInTheDocument();
  });

  test("allows entering a title", async () => {
    render(<Wrapper />);
    const titleInput = screen.getByLabelText(/title:/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(titleInput, "Test Todo");
    });
    expect(titleInput).toHaveValue("Test Todo");
  });

  test("allows entering a description", async () => {
    render(<Wrapper />);
    const descriptionInput = screen.getByLabelText(/description:/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(descriptionInput, "Test Description");
    });
    expect(descriptionInput).toHaveValue("Test Description");
  });

  test("submits the form with title and description", async () => {
    render(<Wrapper />);
    const titleInput = screen.getByLabelText(/title:/i);
    const descriptionInput = screen.getByLabelText(/description:/i);
    const submitButton = screen.getByRole("button", { name: /submit|update/i });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(titleInput, "Test Todo");
      await userEvent.type(descriptionInput, "Test Description");
      await userEvent.click(submitButton);
    });

    expect(mockHandleSaveTodo).toHaveBeenCalledWith({
      title: "Test Todo",
      description: "Test Description",
    });
  });
});
