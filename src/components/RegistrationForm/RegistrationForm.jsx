import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import style from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";

const initialValue = {
  name: "",
  email: "",
  password: "",
};
const validate_shema = Yup.object().shape({
  name: Yup.string().required("Це поле є обов'язковим!").min(2, "Ім'я не може бути з однієї літери!"),
  email: Yup.string().email("Ведіть валідну Email адресу!").required("Це поле є обов'язковим!"),
  password: Yup.string().required("Це поле є обов'язковим!").min(7, "Пароль має бути довшим (Мінімум 7 символів!)"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const handleSubmit = (value, action) => {
    dispatch(register(value))
      .unwrap()
      .catch(() => toast.error("Такий користувач вже існує."));
    action.resetForm();
  };
  return (
    <div>
      <h2>Сторінка реєстрації</h2>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validate_shema}
      >
        <Form className={style.form}>
          <label>
          Ім'я
            <div>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="span" />
            </div>
          </label>
          <label>
            Твій Email
            <div>
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="span" />
            </div>
          </label>
          <label>
            Пароль
            <div>
              <Field type="text" name="password" />
              <ErrorMessage name="password" component="span" />
            </div>
          </label>
          <div>
            <button type="submit">Підтвердити</button>
          </div>
        </Form>
      </Formik>
      <Toaster position="top-center" />
    </div>
  );
}


// User
// Alexandrus
// alexandrus@gmail.com
// alexandr123456
