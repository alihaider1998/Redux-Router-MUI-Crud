import { createSlice } from "@reduxjs/toolkit";

import { UsersData } from "../FakeData";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: UsersData },
  reducers: {
    addUser: (state, action) => {
      state.value.push({id: state.value.length+1, username: action.payload.username, name: action.payload.name, password: action.payload.password});
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUser: (state, action) => {
      state.value.forEach((item) => {
        if (item.id === action.payload.id) {
          item.username = action.payload.username; item.name = action.payload.name
        }
      })
    }
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
