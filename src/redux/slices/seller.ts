import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Seller {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  answer: string;
  pfp: string;
}

export interface SellerState {
  isAuthenticated: boolean;
  seller: Seller | null;
}

const initialState: SellerState = {
  isAuthenticated: false,
  seller: null,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSeller: (state, action: PayloadAction<Seller>) => {
      state.isAuthenticated = true;
      state.seller = action.payload;
    },
    clearSeller: (state) => {
      state.isAuthenticated = false;
      state.seller = null;
    },
  },
});

export const { setSeller, clearSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
