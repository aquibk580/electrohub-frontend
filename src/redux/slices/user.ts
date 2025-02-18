import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  answer: string;
  gender: "Male" | "Female";
}

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  pfp: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  pfp: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.pfp = null;
    },
    setPfp: (state, action: PayloadAction<string>) => {
      state.pfp = action.payload;
    },
  },
});

export const { setUser, clearUser, setPfp } = userSlice.actions;

export default userSlice.reducer;
