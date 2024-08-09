import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface userDataState {
  userData: {
    email: string;
    username: string;
    id?: string;
  };
}
const initialState: userDataState = {
  userData: {
    email: "",
    username: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUserData: (state, action) => {
      state.userData = {
        email: "",
        username: "",
      };
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { initializeUserData, setUserData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
