import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", {
        name,
        number,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
});
export const updateContact = createAsyncThunk("contacts/updateContact", async ({ id, name, number }, thunkAPI) => {
  try {
    const response = await axios.patch(`/contacts/${id}`, {name, number});
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue(error.message)
  }
});