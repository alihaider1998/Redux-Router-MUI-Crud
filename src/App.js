import React from 'react';
import Table from './pages/Table';
import Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from './pages/Signup';
import { useDispatch } from "react-redux";
import { updateStatus } from "./features/LoginStatus";

function App() {

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);
  userList.forEach(item => {
    if (item.username === localStorage.getItem("username")) {
      dispatch(updateStatus(true))
    }
  });
  const login = useSelector((state) => state.loginStatus.value);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/table' element={login ? <Table /> : <Login />

        }

        />

      </Routes>
    </div>
  );
}

export default App;
