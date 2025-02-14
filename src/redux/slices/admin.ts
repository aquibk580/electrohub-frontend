import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  admin: Admin | null;
}

const initialState: AdminState = {
  isAuthenticated: false,
  admin: null,
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    clearAdmin: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    },
  },
});

export const { setAdmin, clearAdmin } = AdminSlice.actions;

export default AdminSlice.reducer;
