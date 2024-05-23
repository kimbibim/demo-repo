import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from "react-icons/md";
import styles from "./TodoList.module.css";
import { useState } from "react";

const TodoListItem = (props) => {
  const { id, text, checked } = props.todo;

  const [removeVisible, setRemoveVisible] = useState(false);

  const handleTouchStart = () => {
    setRemoveVisible(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setRemoveVisible(false), 2000); // 아이콘이 표시된 상태 유지 시간 (2초)
  };

  return (
    <div className={styles.TodoListItem}>
      <div
        className={
          checked ? `${styles.checkbox} ${styles.checked}` : styles.checkbox
        }
        onClick={() => props.onToggle(id)}
        onMouseEnter={() => {
          setRemoveVisible(true);
        }}
        onMouseLeave={() => {
          setRemoveVisible(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className={styles.text}>{text}</div>
      </div>

      <div
        className={styles.remove}
        onClick={() => {
          props.onRemove(id);
        }}
        onMouseEnter={() => {
          setRemoveVisible(true);
        }}
        onMouseLeave={() => {
          setRemoveVisible(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {removeVisible && <MdRemoveCircleOutline />}
      </div>
    </div>
  );
};
export default TodoListItem;
