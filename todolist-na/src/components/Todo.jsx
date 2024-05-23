// This project uses react-icons, which is licensed under the MIT License.
// See https://github.com/react-icons/react-icons/blob/master/LICENSE for more information.
import { useCallback, useRef, useState } from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

const Todo = () => {
  // 처음 로드할 때 localStorage에서 todos를 가져와 상태를 설정
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const nextId = useRef(
    todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1
  );

  const saveTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const onInsert = (text) => {
    const todo = {
      id: nextId.current,
      text: text,
      todoDate: "",
      checked: false,
    };
    const new_todos = [...todos, todo];
    saveTodos(new_todos);
    nextId.current++;
  };

  const onRemove = useCallback(
    (id) => {
      const new_todos = todos.filter((todo) => todo.id !== id);
      saveTodos(new_todos);
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      const new_todos = todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      );
      saveTodos(new_todos);
    },
    [todos]
  );

  return (
    <>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
};

export default Todo;
