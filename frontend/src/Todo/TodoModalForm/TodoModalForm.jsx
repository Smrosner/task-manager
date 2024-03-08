import React from "react";

function TodoModalForm({
  newTodoTitle,
  setNewTodoTitle,
  newTodoDescription,
  setNewTodoDescription,
  handleSaveTodo,
  firstInputRef,
  currentTodo,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const todoData = {
      title: newTodoTitle,
      description: newTodoDescription,
    };
    if (currentTodo && currentTodo.id) {
      todoData.id = currentTodo.id;
    }
    handleSaveTodo(todoData);
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="todoFormTitle">
      {/* Visually hidden h2 title for screen readers */}
      <h2 id="taskFormTitle" className="visually-hidden">
        Todo Form
      </h2>
      <div className="mb-3">
        <label
          htmlFor="taskTitle"
          className="form-label d-flex align-items-start"
        >
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="taskTitle"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          required
          ref={firstInputRef}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="taskDescription"
          className="form-label d-flex align-items-start"
        >
          Description:
        </label>
        <textarea
          className="form-control"
          id="taskDescription"
          rows="3"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        {currentTodo ? "Update" : "Submit"}
      </button>
    </form>
  );
}

export default TodoModalForm;
