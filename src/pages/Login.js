import React from 'react'
import "../styles/Login.css"
import LeftIcon from '../assets/left.svg'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { updateStatus } from "../features/LoginStatus";


function Login() {
  const userList = useSelector((state) => state.users.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
      userList.forEach(item => {
        if (item.username === document.getElementById("username").value 
        &&
         item.password === document.getElementById("password").value) {
          navigate("/table");
          localStorage.setItem("username", item.username);
          dispatch(updateStatus(true))
        }
      });

   
  }
  return (
    <div>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous" />
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link"><Link to="/signup"><img src={LeftIcon} alt="N/A" />Sign Up</Link></div>
            <div className="contact">
              <form onSubmit={((event) => event.preventDefault())}>
                <h3>SIGN IN</h3>
                <input type="text" id='username' placeholder="USERNAME" />
                <input type="password" id='password' placeholder="PASSWORD" />
                <button onClick={() => login()} className="submit">LET'S GO</button>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="right-text">
              <h2>Welcome To User Records</h2>
              <h3>A Redux & React Based Crud</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login