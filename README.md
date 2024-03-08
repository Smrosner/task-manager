# Setting Up and Running the Application

This guide will help you set up and run the Task Manager web application, which features a React frontend and a Flask backend.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- Python 3 and pip (Python Package Installer)

## Backend Setup

1. Navigate to the `backend` directory from the root of the project.
2. Create a virtual environment:
   `python3 -m venv venv`
3. Activate the virtual environment:

- On Windows:
  `venv\Scripts\activate`
- On macOS/Linux:
  `source venv/bin/activate`

4. Install the required Python packages:
   `pip install -r requirements.txt`

## Frontend Setup

1. Navigate to the `frontend` directory from the root of the project.
2. Install the required Node.js packages:
   `npm install`

## Testing Instructions

To ensure the frontend of the application works as expected, you can run the suite of automated tests included with the project. Follow these steps to execute the tests:

1. Ensure you are in the `frontend` directory.
2. Run the test command:
   `npm test`

This command will start the test runner in the interactive watch mode. You will see the results of the tests in the terminal, including which tests passed and which failed. For more detailed information about each test, you can consult the documentation of the testing framework used in the project.

## Running the Application

### Backend

1. Ensure you are in the `backend` directory and the virtual environment is activated.
2. Start the Flask server:
   `python run.py`

### Frontend

1. Open a new terminal and navigate to the `frontend` directory.
2. Start the React development server:
   `npm start`

After starting both the backend and frontend servers, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Stopping the Application

To stop the application, press `Ctrl+C` in both the backend and frontend terminal windows. Deactivate the Python virtual environment in the backend terminal by running `deactivate`.

## Application Demo

Below are animated demonstrations showcasing the Task Manager web application in action. These GIFs provide a quick overview of its key features and the user interface.

### Feature Walkthrough

![Feature Walkthrough](https://media.giphy.com/media/Gq6sthC2ooCXPBod68/giphy.gif)

This GIF demonstrates the core functionalities of the application, including task creation, editing, and deletion.

### Responsive Design

![Responsive Design](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXVyejJ3NnBoa3NzOHRnOHQycHE0cjF3eXpjbTRtdnliZGVxYWp6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4XL5XojbI5rIy81tWk/giphy.gif)

Here, you can see how the application adapts to different screen sizes, ensuring a seamless user experience across all devices.

### Switching to Dark Mode

![Dark Mode Toggle](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2xhaHk5M2gxY25wbGJndWNlZWdrMzVpdWswaW95cGVoMnJiZzQybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FkPjq8IQP5WdNDMv7e/giphy.gif)

With a simple click on the dark mode icon, users can activate the dark theme, providing a sleek and eye-friendly interface for nighttime use or for those who prefer darker color schemes.

&nbsp;

# Architecture and Design Decisions Documentation

## Frontend

- **React**: Chosen for component-based architecture, enhancing maintainability and simplifying state management.
- **Modular Components**: `TodoItem`, `TodoList`, `TodoModal` for easier debugging, testing, and scalability.
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation ensure wide accessibility.
  > For a detailed breakdown, [click here to jump to the Accessibility Considerations in the Frontend section](#frontend-accessibility-considerations).

## Backend

- **Flask**: Selected for simplicity in creating RESTful APIs, allowing quick setup and frontend integration.
- **SQLite**: Used for lightweight, file-based data persistence, ideal for small-scale applications.

## API Design

- **REST Principles**: Ensures scalable and maintainable architecture.
- **Error Handling**: Try-catch blocks in API calls enhance user experience and application stability.

## Testing

- **Jest and React Testing Library**: For unit testing, ensuring code reliability.

&nbsp;

# Frontend Accessibility Considerations

In developing the Task Manager web application, several decisions were made to enhance accessibility, ensuring that the application is usable by as many people as possible, including those who rely on assistive technologies. Below are the key accessibility-focused decisions and implementations:

### ARIA Labels

ARIA (Accessible Rich Internet Applications) labels and roles were extensively used to provide screen reader users with more context about interactive elements and regions. For example, in the `TodoItem` component, ARIA labels were added to checkboxes and buttons to clearly describe their actions:

```ts
<input
  type="checkbox"
  checked={todo.completed}
  onChange={(e) => {
    toggleTodoCompletion(todo.id);
  }}
  aria-label={`Mark ${todo.title} as ${
    todo.completed ? "incomplete" : "complete"
  }`}
/>
```

### Keyboard Navigation

Keyboard navigation is essential for accessibility. Modal components can be closed with the Escape key, improving usability for keyboard-only users:

```ts
const handleKeyDown = (event) => {
  if (event.key === "Escape" && showModal) {
    setShowModal(false);
  }
};
```

### Focus Management

Focus is set to the first input in modals upon opening, aiding users with keyboards and screen readers:

```ts
const firstInputRef = useRef(null);
useEffect(() => {
  if (showModal) {
    firstInputRef.current.focus();
  }
}, [showModal]);
```

#### Dark Mode

Supports dark mode for user preference and visual impairment accommodation. The theme toggle is keyboard and mouse accessible:

```ts
function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={isDarkMode ? "btn btn-light btn-sm" : "btn btn-dark btn-sm"}
      aria-pressed={!isDarkMode}
      aria-label={isDarkMode ? "Activate light mode" : "Activate dark mode"}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
```

These features aim to enhance accessibility, following WCAG guidelines for a broader user interaction with the application.
