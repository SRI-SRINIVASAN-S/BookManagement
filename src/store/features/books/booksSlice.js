import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBooksThunk,
  addBookThunk,
  updateBookThunk,
  deleteBookThunk,
} from "./booksThunks";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBooksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch books";
      })
      // Add
      .addCase(addBookThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // Delete
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
