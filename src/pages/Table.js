import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser, addUser } from "../features/Users";
import { updateStatus } from "../features/LoginStatus";
import { BsTrash } from 'react-icons/bs';
import { MdInsertComment } from 'react-icons/md';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import "../styles/Table.css"

function Table() {
    const navigate = useNavigate();
    const userList = useSelector((state) => state.users.value);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [addModalHeading, setAddModalHeading] = useState(false);
    const [updateModalHeading, setUpdateModalHeading] = useState(false);
    const [updateObject, setUpdateObject] = useState({});
    const nameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const addUserModal = () => {
        setUpdateObject({});
        setAddModalHeading(true);
        setOpen(true);
    }
    const updateModal = (item) => {
        new Promise((resolve, reject) => {
            setUpdateObject(item);
            setUpdateModalHeading(true)
            resolve();
        }).then(() => setOpen(true))
    }
    const closeModal = () => {
        setOpen(false); setAddModalHeading(false); setUpdateModalHeading(false)
    }
    const logoutBtn = () => {
        localStorage.clear();
        dispatch(updateStatus(false))
        navigate("/");
    }
    useEffect(() => {
        userList.forEach(item => {
            if(item.username===localStorage.getItem("username")){
                dispatch(updateStatus(true))
            }
          });    
         });    return (
    <div className="mainDiv">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div style={{display:"float"}}>          
            <button className='logoutBtn' onClick={()=>logoutBtn()} style={{float:"right"}}>Logout <i className="fa fa-sign-out"></i></button></div>
  
                <h1 className="Heading">Users List</h1> 
    <div className="tableBtns">    
              <button onClick={() => addUserModal()} className="btn">Add new User</button></div>
        <div>  <table className='container'>    
                <thead>
                    <tr>
                        <th> 
                            <h1>ID</h1>
                        </th>
                        <th>
                            <h1>Name</h1>
                        </th>
                        <th>
                            <h1>Username</h1>
                        </th>
                        <th><h1>Actions</h1></th>
                    </tr>
                </thead>
                <tbody id="myTable">
                    {
                        userList.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td style={{ cursor: "pointer" }}>
                                        <MdInsertComment
                                            onClick={() => updateModal(item)}
                                            style={{ marginRight: "10px" }} size={20} color={"silver"} />
                                        <BsTrash size={20} color={"red"} onClick={() => {
                                            dispatch(deleteUser({ id: item.id }));
                                        }} />

                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>

            </div>
            <Dialog open={open} onClose={() => closeModal()}>
                <DialogTitle>
                    {addModalHeading ? <span>Add New User</span> : false}
                    {updateModalHeading ? <span>Update</span> : false}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {addModalHeading ? <span>Enter new Name and Username</span> : false}
                        {updateModalHeading ? <span>Enter correct Name or Username</span> : false}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        inputRef={nameRef}
                        defaultValue={updateObject.name}
                        label="Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        inputRef={usernameRef}
                        defaultValue={updateObject.username}
                        label="Username"
                        fullWidth
                        variant="standard"
                    />
                    {addModalHeading ? <TextField
                        autoFocus
                        margin="dense"
                        inputRef={passwordRef}
                        label="Password"
                        fullWidth
                        variant="standard"
                        type="password"
                    /> : false}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeModal()}>Cancel</Button>
                    {updateModalHeading ? <Button onClick={() => {
                        dispatch(
                            updateUser({ id: updateObject.id, username: usernameRef.current.value, name: nameRef.current.value })
                        ); setOpen(false); setAddModalHeading(false); setUpdateModalHeading(false)
                    }}>Update</Button> : false}
                    {addModalHeading ? <Button onClick={() => {
                        dispatch(
                            addUser({ username: usernameRef.current.value, name: nameRef.current.value, password: passwordRef.current.value })
                        ); setOpen(false); setAddModalHeading(false); setUpdateModalHeading(false)
                    }}>Add</Button> : false}

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Table;