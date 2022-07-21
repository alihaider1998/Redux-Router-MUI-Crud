import React from 'react'
import "../styles/Login.css"
import LeftIcon from '../assets/left.svg'
import { useDispatch } from "react-redux";
import { addUser } from "../features/Users";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signup = () => {
        dispatch(
            addUser({ username: document.getElementById("username").value, name: document.getElementById("name").value, password: document.getElementById("password").value })
        );
        alert("You have successfully signed up !! Please Sign In.")
        navigate("/");
    }
    return (
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous" />
            <section className="login">
                <div className="login_box">
                    <div className="left">
                        <div className="top_link"><Link to="/"><img src={LeftIcon} alt="" />Login</Link></div>
                        <div className="contact">
                            <form onSubmit={((event) => event.preventDefault())}>
                                <h3>SIGN UP</h3>
                                <input type="text" id='name' placeholder="NAME" />
                                <input type="text" id='username' placeholder="USERNAME" />
                                <input type="password" id='password' placeholder="PASSWORD" />
                                <button onClick={() => signup()} className="submit">Sign Up</button>
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

export default Signup