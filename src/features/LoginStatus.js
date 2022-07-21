import { createSlice } from "@reduxjs/toolkit";


export const statusSlice = createSlice({
  name:"loginStatus",
  initialState: { value: false },
  reducers: {
    updateStatus: (state, action) => {
      state.value =action.payload;
    }
  },
});

export const { updateStatus } = statusSlice.actions;
export default statusSlice.reducer;
