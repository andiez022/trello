import React from "react";
import TodoList from "./TodoList";


export default function TodoWrapper() {
  return (
    <div className="todo-wrapper">
      <h1>Trello Board</h1>
      
      <div className="task-list">
        <TodoList />
      </div>
    </div>
  );
}
