import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import "./UserPage.css";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.first_name}!</h2>
      <Link to='/EditUser' id="edit-icon">
        Edit<EditIcon sx={{color:"white"}} />
      </Link>
      <br/>
      {/* <p>Your ID is: {user.id}</p> */}
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Email: {user.username}</p>
      <p>Address: {user.address_1}</p>
      <p>Address2: {user.address_2}</p>
      <p>City: {user.city}</p>
      <p>State: {user.state}</p>
      <p>Zip: {user.zip}</p>
      <p>Phone: {user.phone}</p>
      <br/><br/>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
