import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [] },
  reducers: {
    getUsers: (state, action) => {
      state.value = action.payload
    },
    addUser: (state, action) => {
      let myPayload = { id: state.value.length + 1, username: action.payload.username, name: action.payload.name, password: action.payload.password }
      state.value.push(myPayload);
      axios.post("https://62ee420cc1ef25f3da85743b.mockapi.io/users", myPayload).then(
        () => {
          alert("User Added Succesfully")
        }).catch(
          () => {
            alert("Failed to Add New User")
          })
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
      axios.delete(`https://62ee420cc1ef25f3da85743b.mockapi.io/users/${action.payload.id}`).then(
        () => {
          alert("User Deleted Succesfully")
        }).catch(
          () => {
            alert("Failed to Delete User")
          })
    },

    updateUser: (state, action) => {
      state.value.forEach((item) => {
        if (item.id === action.payload.id) {
          item.username = action.payload.username; item.name = action.payload.name
        }
      })
      let obj = { username: action.payload.username, name: action.payload.name }
      axios.put(`https://62ee420cc1ef25f3da85743b.mockapi.io/users/${action.payload.id}`, obj).then(
        () => {
          alert("User Updated Succesfully")
        }).catch(
          () => {
            alert("Failed to Update the User")
          })
    }
  },
});

export const { addUser, deleteUser, updateUser, getUsers } = userSlice.actions;
export default userSlice.reducer;
