import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  test("renders correctly in dark mode", () => {
    render(<ThemeToggle isDarkMode={true} toggleTheme={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn btn-light btn-sm");
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAttribute("aria-label", "Activate light mode");
    expect(button).toHaveTextContent("Light Mode");
  });

  test("renders correctly in light mode", () => {
    render(<ThemeToggle isDarkMode={false} toggleTheme={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn btn-dark btn-sm");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("aria-label", "Activate dark mode");
    expect(button).toHaveTextContent("Dark Mode");
  });

  test("toggles theme on click", () => {
    const toggleTheme = jest.fn();
    render(<ThemeToggle isDarkMode={true} toggleTheme={toggleTheme} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
