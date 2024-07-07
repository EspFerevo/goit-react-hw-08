import { createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./operations";
import { logOut } from "../auth/operations";

const initialState = {
  items: [],
  loading: false,
  error: false,
};

const setLoading = (state) => {
  state.error = false;
  state.loading = true;
};

const setError = (state) => {
  state.loading = false;
  state.error = true;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, setLoading)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, setError)
      .addCase(addContact.pending, setLoading)
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.pending, setLoading)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.payload.id);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = false;
        state.loading = false;
      })
      .addCase(updateContact.pending, setLoading)
      .addCase(updateContact.fulfilled, (state, action) => {
        console.log(action.payload);
        const contactToUpdate = state.items.findIndex(({id}) => id === action.payload.id)
        state.items[contactToUpdate] = action.payload;
      })
      .addCase(updateContact.rejected, setError),
});

export default contactsSlice.reducer;
