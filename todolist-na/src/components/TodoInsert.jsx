import { MdAdd } from "react-icons/md";
import styles from "./TodoInsert.module.css";
import { useState } from "react";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = (e) => setValue(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      // 빈 값이 아닌 경우에만 onInsert 호출
      onInsert(value);
      setValue(""); // 입력 필드를 비움
    }
  };

  return (
    <form className={styles.TodoInsert} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder="할 일을 입력하세요"
        onChange={onChange}
        value={value}
      />

      <button type="submit" className={styles.button}>
        <MdAdd />
      </button>
    </form>
  );
};
export default TodoInsert;
