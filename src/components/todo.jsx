import React, { useState } from "react";

const init = [
  {
    id: 1,
    title: "Buy groceries",
    done: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    done: true,
  },
  {
    id: 3,
    title: "Complete homework",
    done: false,
  },
  {
    id: 4,
    title: "Read a book",
    done: true,
  },
  {
    id: 5,
    title: "Exercise",
    done: false,
  },
];

const todo = () => {
  const [todos, setTodos] = useState(init);
  const [text, setText] = useState("");

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  const addNewTodo = (event) => {
    const newTodo = {
      id: Date.now(),
      title: text,
      done: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setText("");
  };

  const handeKeyDown = (event) => {
    if (event.key === "Enter" && text.trim() !== "") {
      addNewTodo(event);
    }
  };

  const toggleTodoStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
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
            onKeyDown={handeKeyDown}
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
              <p>{t.title}</p>

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
      </div>

      <div className="doneTasks">
        <h3 className="numberOfTask">Done - {doneTodos.length}</h3>

        <ul>
          {doneTodos.map((t) => (
            <li key={t.id}>
              <p>{t.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default todo;
