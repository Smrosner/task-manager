import React from "react";
import { deleteSingleTask } from "../../api/todoAPI";
import TodoItem from "../TodoItem/TodoItem";

function TodoList({
  todos,
  toggleTodoCompletion,
  title,
  showModal,
  setShowModal,
  newTodoTitle,
  setNewTodoTitle,
  newTodoDescription,
  setNewTodoDescription,
  handleSaveTodo,
  currentTodo,
  handleShowModal,
  handleDeleteTodo,
}) {
  const handleDelete = async (todoId) => {
    try {
      await deleteSingleTask(todoId);
      handleDeleteTodo(todoId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };
  return (
    <>
      <h2 className="pt-3">{title}</h2>
      <div className="row align-items-center mb-2 pt-3 border-bottom border-2">
        <div className="col-1">
          <span className="fs-5" role="img" aria-label="Completion Status">
            <strong>✓</strong>
          </span>
        </div>
        <div className="col-sm-4 col-md-3 text-start">
          <span className="fs-5">
            <strong>Task Title</strong>
          </span>
        </div>
        <div className="col-sm-4 col-md-5 text-start">
          <span className="fs-5">
            <strong>Description</strong>
          </span>
        </div>
        <div className="col-auto ms-auto py-2 py-sm-0">
          {/* Placeholder for alignment */}
        </div>
      </div>
      {todos.length === 0 ? (
        <p className="fs-5">
          {title === "Incomplete Tasks"
            ? "Create some tasks above to see them listed here"
            : "Complete some tasks to see them listed here"}
        </p>
      ) : (
        <ul className="list-unstyled" aria-labelledby="task-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
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
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
