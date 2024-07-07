import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectIsError, selectIsLoading } from "../../redux/contacts/selectors";

import ContactForm from "../../components/ContactForm/ContactForm";
import Loader from "../../components/Loader";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function ContactsPage() {
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <ContactForm />
      <SearchBox/>
      {isLoading && isError ? <Loader /> : <ContactList />}
    </div>
  );
}
