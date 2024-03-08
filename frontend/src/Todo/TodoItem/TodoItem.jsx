import React from "react";
import TodoModal from "../TodoModal/TodoModal";

function TodoItem({
  todo,
  toggleTodoCompletion,
  showModal,
  setShowModal,
  newTodoTitle,
  setNewTodoTitle,
  newTodoDescription,
  setNewTodoDescription,
  handleSaveTodo,
  currentTodo,
  handleShowModal,
  handleDelete,
}) {

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && showModal) {
      setShowModal(false);
    }
  };

  return (
    <li key={todo.id} className="py-1 border-bottom">
      <div className="row align-items-center">
        <div className="col-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => {
              toggleTodoCompletion(todo.id);
            }}
            style={{ transform: "scale(1.5)", cursor: "pointer" }}
            aria-label={`Mark ${todo.title} as ${
              todo.completed ? "incomplete" : "complete"
            }`}
          />
        </div>
        <div className="col-sm-4 col-md-3 text-start fs-5">{todo.title}</div>
        <div
          className="col-sm-4 col-md-5 text-start fs-6
          me-3 pt-1 pb-1"
        >
          {todo.description}
        </div>
        <div className="col-auto ms-auto py-2 py-sm-0" tabIndex="-1" onKeyDown={handleKeyDown}>
          <button
            className="btn btn-secondary btn-sm me-1"
            onClick={() => {
              handleShowModal(todo);
            }}
            aria-label={`Edit ${todo.title}`}
          >
            Edit
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
            currentTodo={currentTodo}
          />
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              handleDelete(todo.id);
            }}
            aria-label={`Delete ${todo.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
