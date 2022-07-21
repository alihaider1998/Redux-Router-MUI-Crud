import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/Users';
import loginStatusReducer from '../features/LoginStatus'


export const store = configureStore({
  reducer: {
    users: usersReducer,
    loginStatus: loginStatusReducer,
  },
});
