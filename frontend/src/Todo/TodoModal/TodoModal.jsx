import React, { useEffect, useRef } from "react";
import TodoModalForm from "../TodoModalForm/TodoModalForm";

function TodoModal({
  showModal,
  setShowModal,
  newTodoTitle,
  setNewTodoTitle,
  newTodoDescription,
  setNewTodoDescription,
  handleSaveTodo,
  currentTodo,
}) {
  const firstInputRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      firstInputRef.current.focus();
    }
  }, [showModal]);

  if (!showModal) return null;

  const blackModalBackdrop = `
    .custom-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1040;
    }
  `;

  return (
    <>
      <style>{blackModalBackdrop}</style>
      <div className="custom-backdrop"></div>
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h4 id="modalTitle" className="modal-title">
                {currentTodo ? "Edit Todo Task" : "Add New Todo Task"}
              </h4>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <TodoModalForm
                newTodoTitle={newTodoTitle}
                setNewTodoTitle={setNewTodoTitle}
                newTodoDescription={newTodoDescription}
                setNewTodoDescription={setNewTodoDescription}
                handleSaveTodo={handleSaveTodo}
                firstInputRef={firstInputRef}
                currentTodo={currentTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoModal;
