import React, { useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';

function LogIn(props) {
  // console.log("Log In:", props)

  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = e => {
    if (e.target.name === "username") {
      setUsername(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    }
  }

  const submitHandler = e => {
    e.preventDefault()

    API.login({
      username: username,
      password: password
    })
      .then(data => {
        // console.log('login data:',data)
        props.setUserId(data.user.id)
        props.setEmail(data.user.email)
        props.setFullName(data.user.fullName)
        props.setUsername(data.user.username)
        props.setToken(data.token)
        window.sessionStorage.setItem("token", data.token)
        window.sessionStorage.setItem("userId", data.user.id);
        navigate("/blog")
        // window.location.reload(false);
      }).catch(err => {
        console.log(err)
        alert("Unable to Sign Up")
      })
  }

  return (
    <>
      <Header />
      <nav className='empty-nav'></nav>
      <main className='main-form-li'>
        <section>
          <h1>Log In</h1>
          <form onSubmit={submitHandler}>
            <input id='si-user' name='username' placeholder='username' value={username} onChange={handleChange}></input>
            <input id='si-pass' name='password' type='password' placeholder='password' value={password} onChange={handleChange}></input>
            <button id='si-submit'>Log In</button>
          </form>
          <h2>Don't have an account? <Link id='signin-pg' to='/signup'>Sign Up</Link></h2>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LogIn