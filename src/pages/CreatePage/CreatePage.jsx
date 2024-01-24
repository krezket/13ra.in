import React, { useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/API';
import './CreatePage.css';

function CreatePage(props) {
  // CONSOLE LOG //
  // console.log("createPage:", props)
  // console.log(ID)
  const ID = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [ownerId, setOwnerId] = useState("")
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const handleChange = e => {
    setOwnerId(ID)
    if (e.target.name === "title") {
      setTitle(e.target.value)
    } else if (e.target.name === "text") {
      setText(e.target.value)
    }
  }
  const submitHandler = e => {
    e.preventDefault()

    API.createPage({
      owner_id: ownerId,
      title: title,
      text: text,
    }).then(data => {
      console.log(data)
      navigate("/" + props.username)
      window.location.reload(false);
    }).catch(err => {
      console.log(err)
      alert(err)
    })
  }

  return (
    <>
      <Header
        userId={props.userId}
        username={props.username}
        setUserId={props.setUserId}
        setEmail={props.setEmail}
        setUsername={props.setUsername}
        setToken={props.setToken} 
      />
      <nav className='empty-nav'></nav>

      <main className='main-herald'>
        <section className='cp-section'>

          <h1 className='cp-title'>Create a Page</h1>

          <form onSubmit={submitHandler}>
            <input className='title-input' name='title' placeholder='Title' value={title} onChange={handleChange}></input>
            <textarea className='text-area' rows="10" cols="70" name='text' placeholder='Enter Text Here' value={text} onChange={handleChange}></textarea>
            <button className='submit-btn'>Submit</button>
          </form>
          
        </section>
      </main>
      <Footer />
    </>
  )
}

export default CreatePage