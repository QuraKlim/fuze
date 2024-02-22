import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chuckReducer from "../features/chuck/chuckSlice";

export const store = configureStore({
  reducer: {
    chuck: chuckReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
