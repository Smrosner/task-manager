import React, { useState } from "react";
import { createTask, updateSingleTask } from "../../api/todoAPI.js";
import TodoList from "../TodoList/TodoList";
import TodoModal from "../TodoModal/TodoModal";

function TodoListComponent({ todos, setTodos }) {
  const [showModal, setShowModal] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [currentTodo, setCurrentTodo] = useState({});

  const handleSaveTodo = async (todo) => {
    if (todo.id) {
      try {
        await updateSingleTask(todo.id, todo);
        const updatedTodos = todos.map((t) =>
          t.id === todo.id ? { ...t, ...todo } : t
        );
        setTodos(updatedTodos);
        setShowModal(false);
      } catch (error) {
        console.error(`Failed to update task: `, error);
      }
    } else {
      try {
        const newTodo = await createTask(todo);
        setTodos([...todos, newTodo]);
        setNewTodoTitle("");
        setNewTodoDescription("");
        setShowModal(false);
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    }
  };

  const toggleTodoCompletion = async (todoId) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
      const response = await updateSingleTask(todoId, {
        completed: updatedTodo.completed,
      });
      setTodos(todos.map((todo) => (todo.id === todoId ? response : todo)));
    } catch (error) {
      console.error(
        `Failed to toggle completion for task ${todoId}: ${error.message}`
      );
    }
  };

  const incompleteTasks = todos.filter((todo) => !todo.completed);
  const completeTasks = todos.filter((todo) => todo.completed);

  const handleShowModal = (todo = null) => {
    setShowModal(true);
    setCurrentTodo(todo);
    if (todo) {
      setNewTodoTitle(todo.title);
      setNewTodoDescription(todo.description);
    } else {
      setNewTodoTitle("");
      setNewTodoDescription("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && showModal) {
      setShowModal(false);
    }
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="px-5" tabIndex="-1" onKeyDown={handleKeyDown}>
      <button
        className="btn btn-primary my-4 col-8 mx-auto"
        onClick={() => handleShowModal()}
        aria-label="Add new task"
      >
        New Task
      </button>
      <TodoModal
        showModal={showModal}
        setShowModal={setShowModal}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        newTodoDescription={newTodoDescription}
        setNewTodoDescription={setNewTodoDescription}
        handleSaveTodo={handleSaveTodo}
        handleShowModal={handleShowModal}
      />
      <TodoList
        title="Incomplete Tasks"
        todos={incompleteTasks}
        toggleTodoCompletion={toggleTodoCompletion}
        showModal={showModal}
        setShowModal={setShowModal}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        newTodoDescription={newTodoDescription}
        setNewTodoDescription={setNewTodoDescription}
        handleSaveTodo={handleSaveTodo}
        handleShowModal={handleShowModal}
        currentTodo={currentTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
      <div className="py-5">
        <TodoList
          title="Complete Tasks"
          todos={completeTasks}
          toggleTodoCompletion={toggleTodoCompletion}
          showModal={showModal}
          setShowModal={setShowModal}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          newTodoDescription={newTodoDescription}
          setNewTodoDescription={setNewTodoDescription}
          handleSaveTodo={handleSaveTodo}
          currentTodo={currentTodo}
          handleShowModal={handleShowModal}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default TodoListComponent;
