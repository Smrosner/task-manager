import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import TodoListComponent from "./Todo/TodoListComponent/TodoListComponent";
import { fetchAllTasks } from "./api/todoAPI";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchAllTasks();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error(error);
      }
    };
    loadTodos();
  }, []);

  return (
    <div
      className={`text-center ${
        isDarkMode ? "bg-dark text-white" : "bg-light text-black"
      }`}
      style={{ minHeight: "100vh", fontSize: "calc(10px + 2vmin)" }}
    >
      <div className="d-flex justify-content-end p-5">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
      <div className={"p-3 d-flex flex-column"}>
        <header className="align-items-center justify-content-between">
          <h1>To Do Task Manager</h1>
        </header>
        <TodoListComponent todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
