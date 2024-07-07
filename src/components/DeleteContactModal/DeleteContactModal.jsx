import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import style from "./DeleteContactModal.module.css";

export default function DeleteModal({ id, onReject }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully");
        onReject();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className={style.deleteModalCont}>
      <p>Видалити цей контакт з Вашої книги ?</p>
      <div className={style.btnCont}>
        <button type="button" onClick={handleDelete}>
         Так!
        </button>
        <button
          type="button"
          className={style.cancelButton}
          onClick={onReject}
        >
     Ні! 
        </button>
      </div>
      <Toaster />
    </div>
  );
}
