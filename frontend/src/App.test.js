import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders 'To Do Task Manager' heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/To Do Task Manager/i);
  expect(headingElement).toBeInTheDocument();
});
