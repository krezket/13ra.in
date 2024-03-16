import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css'
import API from "../../utils/API";

export default function UserPage(props) {
  console.log("UserPage Props:", props);

  const [newPage, setNewPage] = useState({})
  console.log("NEWPAGE:", newPage)
  const [username, setUsername] = useState("")
  const [comments , setComments] = useState([{}])
  console.log("COMMENTS:", comments)
  const [createdAt, setCreatedAt] = useState("")
  const date = dayjs(createdAt).format('M/D/YYYY')

  const pathArr = window.location.pathname.split('/');
  let path = pathArr[2].split('/').pop()
  // console.log("PATH:", path)

  const [text, setText] = useState("")
  const handleChange = e => {
    if (e.target.name === "text") {
      setText(e.target.value)
    }
  }

  // console.log(newPage.users.username)

  useEffect(() => {
    API.getPage(path)
      .then((data) => {
        // console.log("REALPAGEDATA:",data)
        setNewPage(data)
        setUsername(data.users.username)
        setComments(data.comments)
        setCreatedAt(data.createdAt)
        console.log("DATE:", date)
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }, [path]);

  const submitHandler = e => {
    e.preventDefault()
    API.postComment({
      text: text,
      owner_id: props.userId,
      page_id: path
    })
      .then((data) => {
        console.log("Comment:", data)
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }

  return (
    <>
      <Header
        type={props.type}
        username={props.username}
        userId={props.userId}
        setUserId={props.setUserId}
        setEmail={props.setEmail}
        setUsername={props.setUsername}
        setToken={props.setToken}
      />

      <div className="main-con">
        <main className='page-main'>

          <div className='title-div'>
            <h1 className='page-title'>{newPage.title}</h1>
          </div>

          <div className='username-div'>
            <h3 className='page-username'>
              <Link to={"/" + username} id='user-link'>{username}</Link>
            </h3>
          </div>

          <p className='page-text'>{newPage.text}</p>

          <div className='date-div'>
            <p className='date-created'>
              {newPage.createdAt && (
                <p className="dayjs" format="M/D/YYYY h:mm a">
                  {newPage.createdAt}
                </p>
              )}
            </p>
          </div>

        </main>

        <div className='comment-div'>
          <h2>Comments</h2>
          {comments == '' ? 
          <p>No Comments Yet</p> 
          : 
          comments.map(({text, users, createdAt}) => (
            <div key={text}>
              <h3>{users && users.username}</h3> 
              <p>{text}</p>
              <>
                <p format="M/D/YYYY h:mm a">
                  {date}
                </p>
              </>
            </div>
          ))
          }
          <form onSubmit={submitHandler}>
            <textarea cols="100" name='text' placeholder='Write a comment' value={text} onChange={handleChange}></textarea>
            <button>Comment</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}