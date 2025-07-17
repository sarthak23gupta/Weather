import { setupListeners } from '@reduxjs/toolkit/query';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../redux/slice/UserSlice';
// import axios from 'axios';



const Login = () => {
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleChange = (e)=>{
    const value=e.target.value
    const name=e.target.name

    setFormData(previousArray=>({...previousArray,[name]:value}))
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);

    fetch(`http://localhost:4444/login` , {
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data);

      if(data.success==true)
      {
        // localStorage.setItem('user',formData.email)
        dispatch(setUser(formData.email))
        navigate('/')
        
      }
    })

  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>

      <p>New User? <span style={{textDecoration:"underline", cursor:'pointer'}} onClick={()=>navigate('/signup')} >SignUp</span> </p>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    marginTop: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default Login;