import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL =
  "https://crudcrud.com/api/be8712c463f646bd8033ca5e089dc412/books";

// Fetch all books
export const fetchBooksThunk = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_BASE_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch books");
    }
  }
);

// Add a book
export const addBookThunk = createAsyncThunk(
  "books/addBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_BASE_URL, book);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to add book");
    }
  }
);

// Update a book
export const updateBookThunk = createAsyncThunk(
  "books/updateBook",
  async (book, { rejectWithValue }) => {
    try {
      const { _id, ...bookData } = book;
      await axios.put(`${API_BASE_URL}/${_id}`, bookData);
      return { ...bookData, _id };
    } catch (err) {
      return rejectWithValue("Failed to update book");
    }
  }
);

// Delete a book
export const deleteBookThunk = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete book");
    }
  }
);
