import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import style from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const initialValues = {
  name: "",
  number: "",
};

const validation_schema = Yup.object().shape({
  name: Yup.string().required("Required").min(3, "Name must be longer"),
  number: Yup.string().required("Required").min(3, "Number must be longer"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const handleSubmit = (value, action) => {
    dispatch(addContact({ ...value }))
      .unwrap()
      .then(() => {toast.success("You have successfully added a user");})
      .catch(() => {toast.error("Something went wrong");});
    action.resetForm();
  };

  return (
    <div className={style.formContainer}>
      <h2>Contacts</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validation_schema}
        onSubmit={handleSubmit}
      >
        <Form className={style.form}>
          <label>
            <span>Ім`я</span>
            <Field name="name" />
            <ErrorMessage name="name" component="span" />
          </label>
          <label>
            <span>Номер телефону</span>
            <Field name="number" />
            <ErrorMessage name="number" component="span" />
          </label>
          <div className={style.buttonCont}>
            <button type="submit" className={style.button}>Додати до моєї книги!</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
