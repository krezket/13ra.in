import React from 'react';
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css'


function UserPage(props) {
  console.log("UserPage Props:", props)
  window.sessionStorage.setItem('path', window.location.pathname)

  return (
    <>
      {/* <Header /> */}
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

        <nav className='empty-nav'></nav>

      </>
      <main className='page-main'>

        <div className='title-div'>
          <h1 className='page-title'>{props.title}</h1>
        </div>

        <div className='username-div'>
          <h3 className='page-username'>
            <Link to={"/&/" + props.pageUsername} id='user-link'>{props.pageUsername}</Link>
          </h3>
        </div>

        <p className='page-text'>{props.text}</p>

        <div className='date-div'>
          <p className='date-created'><DayJS className="dayjs" format="M/D/YYYY h:mm a">{props.createdAt}</DayJS></p>
        </div>

      </main>
      <Footer />
    </>
  )
}

export default UserPage