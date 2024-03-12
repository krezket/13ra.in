import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css'
import API from "../../utils/API";

export default function UserPage(props) {
  console.log("UserPage Props:", props);

  const pathArr = window.location.pathname.split('/');
  let path = pathArr[2].split('/').pop()
  console.log("PATH:", path)

  const [newPage, setNewPage] = useState("")
  console.log("NEWPAGE:", newPage)

  // console.log(newPage.users.username)
  
    useEffect(() => {
      API.getPage(path)
        .then((data) => {
          // console.log("REALPAGEDATA:",data)
          setNewPage(data)
        })
        .catch((err) => {
            console.log("oh noes");
            console.log(err);
        }); 
    }, []);

  return (
    <>
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
      </>
      <main className='page-main'>

        <div className='title-div'>
          <h1 className='page-title'>{newPage.title}</h1>
        </div>

        <div className='username-div'>
          <h3 className='page-username'>
            {/* <Link to={"/" + newPage.users.username} id='user-link'>{newPage.users.username}</Link> */}
          </h3>
        </div>

        <p className='page-text'>{newPage.text}</p>

        <div className='date-div'>
          <p className='date-created'><DayJS className="dayjs" format="M/D/YYYY h:mm a">{props.createdAt}</DayJS></p>
        </div>

      </main>
      <Footer />
    </>
  )
}