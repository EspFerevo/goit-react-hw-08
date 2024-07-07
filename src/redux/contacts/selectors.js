import { createSelector } from "@reduxjs/toolkit";
import { selectContactFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectIsError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectContactFilter],
  (contacts, filter) => {
    console.log("selectFilteredContacts");
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.toLowerCase().includes(filter.toLowerCase())
    );}
);
