import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJokes } from "./chuckApi";

interface IJoke {
  icon_url: string;
  id: string;
  url: string;
  value: string;
  updated_at: string;
  created_at: string;
}

export interface CounterState {
  jokes: IJoke[] | null;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  jokes: null,
  status: "idle",
};

export const fetchJokesByValue = createAsyncThunk(
  "chuck/fetchJokes",
  async (searchValue: string) => {
    const response = await fetchJokes(searchValue);
    console.log(response.data);
    return response.data;
  }
);

export const chuckSlice = createSlice({
  name: "chuck",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchJokesByValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJokesByValue.fulfilled, (state, action) => {
        state.status = "idle";
        state.jokes = action.payload.result;
      })
      .addCase(fetchJokesByValue.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default chuckSlice.reducer;
