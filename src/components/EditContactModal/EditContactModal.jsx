import { ErrorMessage, Field, Form, Formik } from "formik";
import style from "./EditContactModal.module.css";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
  number: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
});

export default function EditContactModal({ id, name, number, onReject }) {
  const dispatch = useDispatch();

  const hasValuesChanged = (value) =>
    value.name === name && value.number === number;

  const handleSubmit = (value) => {
    if (hasValuesChanged(value)) {
      return toast.error("Please change some info for save");
    }
    dispatch(updateContact({ ...value, id }))
      .unwrap()
      .then(() => {
        toast.success("Contact updated successfully");
        onReject();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const initialValues = {
    name,
    number,
  };

  return (
    <div className={style.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VALIDATION_SCHEMA}
      >
        <Form>
          <div className={style.inputCont}>
            <label>
              <span>Name</span>
              <Field name="name" />
              <ErrorMessage component="span" name="name" />
            </label>
            <label>
              <span>Number</span>
              <Field name="number" />
              <ErrorMessage component="span" name="number" />
            </label>
          </div>
          <div className={style.btnCont}>
            <button type="submit">Save</button>
            <button
              type="button"
              className={style.cancelButton}
              onClick={onReject}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
      <Toaster />
    </div>
  );
}
