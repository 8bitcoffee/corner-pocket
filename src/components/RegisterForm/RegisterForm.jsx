import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const checkRegex = (pswd) => {
    let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,24}$/;
    return regex.test(password);
  }

  const registerUser = (event) => {
    event.preventDefault();

    if (!(checkRegex(password))){
      dispatch({type:'PASSWORD_CRITERIA_FAIL'});
    }
    else if(password != password2){
      dispatch({type: 'PASSWORD_MATCH_FAIL'});
    }
    else if(!(username.includes("@") && username.includes("."))){
      dispatch({type: 'USERNAME_NOT_EMAIL'});
    }
    else {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      });
    }
  }; // end registerUser

  return (
    <form id="register-form" className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="first-name">
          First Name:
          <input
            type="text"
            name="first-name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last-name">
          Last Name:
          <input
            type="text"
            name="last-name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <br/><br/>
      <div>
        <label htmlFor="username">
          Email:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password2">
          Confirm Password:
          <input
            type="password"
            name="password2"
            value={password2}
            required
            onChange={(event) => setPassword2(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input id="register-btn" className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
