import { useDispatch, useSelector } from "react-redux";
import { selectContactFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";
import style from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectContactFilter);

  const handleFilter = (e) =>
    dispatch(changeFilter(e.target.value));

  return (
    <div className={style.searchBoxCont}>
      <p>Знайди контакт у списку!</p>
      <input
        type="text"
        value={filter}
        onChange={handleFilter}
        placeholder="Шукати контакт..."
      />
    </div>
  );
}
