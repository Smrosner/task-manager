import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoModal from "./TodoModal";

describe("TodoModal Component", () => {
  const mockHandleSaveTodo = jest.fn();
  const props = {
    showModal: false,
    setShowModal: jest.fn(),
    newTodoTitle: "",
    setNewTodoTitle: jest.fn(),
    newTodoDescription: "",
    setNewTodoDescription: jest.fn(),
    handleSaveTodo: mockHandleSaveTodo,
    currentTodo: null,
  };

  it("should not render the modal when showModal is false", () => {
    render(<TodoModal {...props} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render the modal when showModal is true", () => {
    render(<TodoModal {...props} showModal={true} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should focus on the first input when the modal is shown", () => {
    render(<TodoModal {...props} showModal={true} />);
    const firstInput = screen.getByRole("textbox", { name: "Title:" });
    expect(firstInput).toHaveFocus();
  });

  it("should close the modal when the close button is clicked", () => {
    render(<TodoModal {...props} showModal={true} />);
    fireEvent.click(screen.getByLabelText("Close"));
    expect(props.setShowModal).toHaveBeenCalledWith(false);
  });
});
