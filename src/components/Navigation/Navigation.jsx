import { Link } from "react-router-dom";
import style from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={style.NavigationCont}>
      <Link to="/">Домашня сторінка</Link>
      {isLoggedIn && <Link to="/contacts">Список контактів</Link>}
    </div>
  );
}
