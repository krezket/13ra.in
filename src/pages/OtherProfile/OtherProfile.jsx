  import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import loading from '../../assets/banana.gif'
import API from '../../utils/API';

export default function OtherProfile(props) {
  console.log("MINELOGGEDIN", props)
  const [user, setUser] = useState("")
  console.log("user",user)

  const pathArr = window.location.pathname.split('/');
  let path = pathArr[1].split('/').pop()

  useEffect(() => {
    API.getProfileByName(path)
      .then((data) => {
        console.log("Get User:", data)
        setUser(data)
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }, [path])

  const handleFriendAdd = e => {
    e.preventDefault()

    API.addFriend({
      id: props.userId,
      friend_id: user.id,

    }).then((data) => {
      console.log(data)
      // window.location.reload(false);

    }).catch(err => {
      console.log(err)
      alert(err)
    })
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

      <div className="main-con-profile">
        <main className='pr-main'>
          <div className='h1-ar'>

            <div className='usr-fri'>

              <h1 className='profile-username'>{user.username}</h1>

              {!user.friends ?
                <h3 className='profile-pages'>Friends: 0</h3>
                :
                <h3 className='profile-pages'><Link>Friends:</Link> {user.friends.length}</h3>
              }

              {!user.pages ?
                <h3 className='profile-pages'>No Posts</h3>
                :
                <h3 className='profile-pages'>Total Pages: {user.pages.length}</h3>
              }

              <button onClick={handleFriendAdd}>Add Friend</button>
            </div>

            <article className='profile-bio'>
              {!user.bio ?
                <p></p>
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

      </div>


      <Footer />

    </>
  )
}