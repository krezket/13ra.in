import React, { useState } from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { emailCheck, passwordCheck } from '../../utils/index';
import API from '../../utils/API';
import './style.css'


function SignUp(props) {
  // console.log(props)
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = e => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "fullName") {
      setFullName(e.target.value)
    } else if (e.target.name === "username") {
      setUsername(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    if (password.length < 8) {
      return alert("Password must have at least 8 characters")
    }
    if (!passwordCheck(password)) {
      return alert("Password must contain at least: \n\nOne uppercase letter \nOne number \nOne special character")
    }
    if (!emailCheck(email)) {
      return alert("Invalid Email")
    }
    API.signup({
      email: email,
      fullName: fullName,
      username: username,
      password: password
    })
      .then(data => {
        console.log(data)
        props.setEmail(data.user.email)
        props.setFullName(data.user.fullName)
        props.setUserId(data.user.id)
        props.setUsername(data.user.username)
        props.setToken(data.token)
        window.sessionStorage.setItem("token", data.token)
        window.sessionStorage.setItem("userId", data.user.id);

        navigate("/" + username)
      }).catch(err => {
        console.log(err)
        localStorage.removeItem("token")
        alert(err)
      })
  }

  return (
    <>
      <Header />
      <nav className='empty-nav'></nav>
      <main className='main-form-su'>
        {/* <aside className='aside-left'>
            yo
          </aside> */}
        <section>
          <h1>Create an account</h1>
          <form onSubmit={submitHandler}>
            <input id='su-email' name='email' placeholder='email' value={email} onChange={handleChange}></input>
            <input id='su-fullName' name='fullName' placeholder='full name' value={fullName} onChange={handleChange}></input>
            <input id='su-user' name='username' placeholder='username' value={username} onChange={handleChange}></input>
            <input id='su-pass' name='password' type='password' placeholder='password' value={password} onChange={handleChange}></input>
            <button id='su-submit'>Sign Up</button>
          </form>
          <h2>Already have an account? <Link id='login-pg' to='/login'>Log In</Link></h2>
        </section>
        {/* <aside className='aside-right'>
            yo
          </aside> */}
      </main>
      <Footer />
    </>
  )
}

export default SignUp