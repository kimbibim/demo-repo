import Calendar from "./Calendar.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import styles from "./TodoTemplate.module.css";
import Todo from "./Todo.jsx";
import { format, parse } from "date-fns";

// 메인 컴포넌트
function MainCalendar() {
  return (
    <>
      <Calendar />
    </>
  );
}

// About 컴포넌트
function MonthTodoList() {
  const navigate = useNavigate();
  const { date } = useParams(); //URL에서 날짜를 가져옴
  const parsedDate = date ? parse(date, "yyyyMMdd", new Date()) : new Date(); // 문자열을 날짜 객체로 변환

  const goToMain = () => {
    navigate("/");
  };

  return (
    <>
      <Calendar />
      <Todo />
      <button onClick={goToMain}>메인으로 이동</button>
    </>
  );
}

// Info 컴포넌트
function Info() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>달성률 페이지</h1>
      <p>하루, 일주일, 월별차트를 넣고 싶다</p>
      <button onClick={goToMain}>메인으로 이동</button>
    </div>
  );
}

function Layout() {
  const navigate = useNavigate();
  const currentDate = format(new Date(), "yyyyMMdd");

  const goToTodoList = () => {
    navigate(`/todolist/${currentDate}`);
  };

  return (
    <div>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              달력
            </Link>
          </li>
          <li className={styles.navItem}>
            <span onClick={goToTodoList} className={styles.navLink}>
              일별List
            </span>
          </li>
          <li className={styles.navItem}>
            <Link to="/info" className={styles.navLink}>
              달성률
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

// 라우터 컴포넌트
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainCalendar />} />
          <Route path="/todolist/:date" element={<MonthTodoList />} />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
