import style from "./HomePage.module.css";
import { MdImportContacts } from "react-icons/md";

export default function HomePage() {
  return (
    <div className={style.titlePage}>
      <h1>
        Привіт! Це твоя домашня сторінка, будь ласка, увійдіть або зареєструйтеся!
        Якщо ви авторизовані, перейдіть до списку своїх контактів.
</h1>
      <MdImportContacts />
    </div>
  );
}
