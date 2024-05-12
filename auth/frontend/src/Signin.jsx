import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  axios.defaults.withCredentials=true
const navigate=useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        console.warn(`Unexpected field name: ${name}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement validation logic for email and password (e.g., email format, password strength)
    // You may use a library like yup or implement manual validation

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        email,
        password,
      });
      console.log(response.data); // Handle successful login response
navigate('/Home')
      // Redirect or handle successful login (e.g., store JWT token)
      // ...

    } catch (error) {
      console.error(error.response.data); // Handle login errors (display appropriate messages)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
      <button  path>Signup</button>
    </form>
  );
};

export default Signin;
