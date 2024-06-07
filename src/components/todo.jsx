import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const init = [
  {
    id: 1,
    title: "Buy groceries",
    done: false,
    addedAt: new Date().toLocaleString(),
    checkedAt: null,
    deletedAt: null,
  },
  {
    id: 2,
    title: "Walk the dog",
    done: true,
    addedAt: new Date().toLocaleString(),
    checkedAt: new Date().toLocaleString(),
    deletedAt: null,
  },
  {
    id: 3,
    title: "Complete homework",
    done: false,
    addedAt: new Date().toLocaleString(),
    checkedAt: null,
    deletedAt: null,
  },
  {
    id: 4,
    title: "Read a book",
    done: true,
    addedAt: new Date().toLocaleString(),
    checkedAt: new Date().toLocaleString(),
    deletedAt: null,
  },
  {
    id: 5,
    title: "Exercise",
    done: false,
    addedAt: new Date().toLocaleString(),
    checkedAt: null,
    deletedAt: null,
  },
];

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : init;
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodos = todos.map((todo) =>
          todo.id === id
            ? { ...todo, deletedAt: new Date().toLocaleString() }
            : todo
        );
        setTodos(newTodos);
        setTimeout(() => {
          const filteredTodos = newTodos.filter((t) => t.id !== id);
          setTodos(filteredTodos);
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        }, 500);
      }
    });
  };

  const addNewTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: text,
      done: false,
      addedAt: new Date().toLocaleString(),
      checkedAt: null,
      deletedAt: null,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && text.trim() !== "") {
      addNewTodo();
    }
  };

  const toggleTodoStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
          checkedAt: new Date().toLocaleString(),
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const undoCheck = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: false, checkedAt: new Date().toLocaleString() };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const clearTodos = () => {
    if (todos.length === 0) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos([]);
        Swal.fire({
          title: "Cleared!",
          text: "All tasks have been cleared.",
          icon: "success",
        });
      }
    });
  };

  const doneTodos = todos.filter((t) => t.done);
  const todosTodo = todos.filter((t) => !t.done);

  return (
    <div className="todoCard">
      <div className="newTask">
        <label htmlFor="newTask">
          <input
            type="text"
            id="newTask"
            name="newTask"
            placeholder="Add a new task"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={handleKeyDown}
            value={text}
          />
        </label>

        <button
          type="submit"
          className="addButton"
          disabled={text === ""}
          onClick={addNewTodo}
        >
          <i className="pi pi-plus"></i>
        </button>
      </div>

      <div className="tasks">
        <h3 className="numberOfTask">Tasks to do - {todosTodo.length}</h3>

        <ul>
          {todosTodo.map((t) => (
            <li key={t.id}>
              <abbr
                className="custom-abbr"
                title={`Added: ${t.addedAt || "Start of the project"}${
                  t.checkedAt ? ` | Last Checked: ${t.checkedAt}` : ""
                }`}
              >
                <p>{t.title}</p>
              </abbr>
              <div className="btns">
                <button
                  type="submit"
                  id="checkButton"
                  onClick={() => toggleTodoStatus(t.id)}
                >
                  <i className="pi pi-check"></i>
                </button>
                <button
                  type="submit"
                  id="deleteButton"
                  onClick={() => deleteTodo(t.id)}
                >
                  <i className="pi pi-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button type="submit" className="clearButton" onClick={clearTodos}>
          Clear
        </button>
      </div>

      <div className="doneTasks">
        <h3 className="numberOfTask">Done - {doneTodos.length}</h3>

        <ul>
          {doneTodos.map((t) => (
            <li key={t.id}>
              <abbr
                className="custom-abbr"
                title={`Added: ${t.addedAt || "Start of the project"}${
                  t.checkedAt ? ` | Last Checked: ${t.checkedAt}` : ""
                }`}
              >
                <p>{t.title}</p>
              </abbr>

              <div className="btns">
                <button
                  type="submit"
                  id="undoButton"
                  onClick={() => undoCheck(t.id)}
                >
                  <i className="pi pi-undo"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
