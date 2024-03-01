import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PhoneNumberInput: true,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    updateInputDisability: (state, action) => {
      state.PhoneNumberInput = action.payload;
    },
  },
});

export default generalSlice.reducer;
export const {
  updateInputDisability
} = generalSlice.actions;
