import { Link } from "react-router-dom";
import style from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={style.NavigationCont}>
      <Link to="/register">Реєстрація</Link>
      <Link to="/login">Логування</Link>
    </div>
  );
}
