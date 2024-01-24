import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import loading from '../../assets/banana.gif'
import API from '../../utils/API';

export default function OtherProfile(props) {
  console.log(props)
  const [user, setUser] = useState("")

  const pathArr = window.location.pathname.split('&');
  let path = pathArr[1].split('/').pop()

  useEffect(() => {
    API.getProfileByName(path)
      .then((data) => {
        // console.log("Get User:", data)
        setUser(data)
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }, [path])

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

      <nav className='empty-nav'></nav>

      <main className='pr-main'>
        <div className='h1-ar'>

          <div className='usr-fri'>

            <h1 className='profile-username'>{user.username}</h1>

            {!props.friends ?
              <h3 className='profile-pages'>Friends: 0</h3>
              :
              <h3 className='profile-pages'>Friends: {props.friends.length}</h3>
            }
            {!user.pages ?
              <h3 className='profile-pages'>No Pages Yet</h3>
              :
              <h3 className='profile-pages'>Total Pages: {user.pages.length}</h3>
            }

          </div>

          <article className='profile-bio'>
            {!user.bio ?
              <p>no bio yet</p>
              :
              <p>{user.bio}</p>
            }
          </article>
          {!user ?

            <img src={loading} alt='loading'></img>
            :

            <section className='fp-section'>

              {user.pages.map(({ id, title }) => (
                <Link id='fp-link' key={title} to={"/" + user.username + "/" + id}>
                  <div className='card' key={title}>
                    {title}
                  </div>
                </Link>
              ))
              }
            </section>
        }

        </div>

      </main>

      <Footer />

    </>
  )
}
