import style from "./Contact.module.css";
import { useState } from "react";
import DeleteModal from "../../DeleteContactModal/DeleteContactModal";
import EditContactModal from "../../EditContactModal/EditContactModal";

export default function Contact({ id, name, number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteContact = () => setIsDeleting(true);
  const handleRejectDeletion = () => setIsDeleting(false);

  const handleEditContact = () => setIsEditing(true);
  const handleCancelEditContact = () => setIsEditing(false);
  return (
    <li className={style.contactsItemCont}>
      {isDeleting && <DeleteModal id={id} onReject={handleRejectDeletion} />}
      {isEditing && (
        <EditContactModal
          id={id}
          name={name}
          number={number}
          onReject={handleCancelEditContact}
        />
      )}
      {!isDeleting && !isEditing && (
        <div className={style.contactWrapper}>
          <div className={style.userInfo}>
            <p>{name}</p>
            <p>{number}</p>
          </div>
          <div className={style.btnCont}>
            <button
              type="button"
              className={style.deleteButton}
              onClick={handleDeleteContact}
            >
              Видалити контакт
            </button>
            <button
              type="button"
              onClick={handleEditContact}
            >
              Редагувати контакт
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
