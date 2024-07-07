import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import style from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";

const initialValue = {
  email: "",
  password: "",
};
const validate_shema = Yup.object().shape({
  email: Yup.string().email("Ведіть валідну Email адресу!").required("Це поле є обов'язковим!"),
  password: Yup.string().required("Це поле є обов'язковим!").min(7, "Пароль має бути довшим (Мінімум 7 символів!"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const handleSubmit = (value, action) => {
    dispatch(login(value))
      .unwrap()
      .catch(() => toast.error("Вибачте, користувача не знайдено!"));
    action.resetForm();
  };
  return (
    <div>
      <h2>Сторінка логування</h2>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validate_shema}
      >
        <Form className={style.form}>
          <label>
            Твій Email
            <div>
              <Field  type="text" name="email" />
              <ErrorMessage name="email" component="span" />
            </div>
          </label>
          <label>
            Пароль
            <div>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="span" />
            </div>
          </label>
          <div>
            <button type="submit">Підтвердити</button>
          </div>
        </Form>
      </Formik>
      <Toaster />
    </div>
  );
}
