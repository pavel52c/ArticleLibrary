import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  page: string;
}

const initialState: ModalState = {
  isOpen: false,
  page: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state: ModalState, action: PayloadAction<Partial<string>>) => {
      state.isOpen = true;
      if (action.payload) state.page = action.payload;
    },
    closeModal: (state: ModalState) => {
      state.isOpen = false;
    },
    setPage: (state: ModalState, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
  },
});

export const ModalReducer = modalSlice.reducer;
export const ModalActions = modalSlice.actions;
