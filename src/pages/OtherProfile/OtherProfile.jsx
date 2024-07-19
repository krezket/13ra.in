import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import loading from '../../assets/banana.gif'
import API from '../../utils/API';

export default function OtherProfile(props) {
  // console.log("Other Profile:", props)
  const currentUserID = sessionStorage.getItem("userId");

  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

  const [user, setUser] = useState("");

  const [following, setFollowing] = useState(null);

  console.log(currentUserID)
  console.log(user.id)

  const pathArr = window.location.pathname.split('/');
  let path = pathArr[1].split('/').pop();

  useEffect(() => {
    API.getProfile(currentUserID)
      .then((data) => {
        setCurrentUserFollowing(data.following)
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }, [currentUserID]);

  useEffect(() => {
    API.getProfileByName(path)
      .then((data) => {
        setUser(data)
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }, [path])

  useEffect(() => {
    const foundUser = currentUserFollowing.find(obj => obj.id === user.id)
    if (foundUser) {
      setFollowing(true)
      console.log('Found object:', foundUser);
    } else {
      setFollowing(false)
      console.log('Object not found');
    }
  }, [currentUserFollowing, user.id])

  const handleFollow = e => {
    e.preventDefault()

    API.addFollow({
      id: props.userId,
      follow_id: user.id,

    }).then((data) => {
      console.log(data)
      window.location.reload(false);

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

              {!user.followers && !user.following ?
                <>
                  <h3 className='profile-pages'>Followers: 0</h3>
                  <h3 className='profile-pages'>Following: 0</h3>
                </>
                :
                <>
                  <h3 className='profile-pages'>Followers: {user.followers.length}</h3>
                  <h3 className='profile-pages'>Following: {user.following.length}</h3>
                </>
              }

              {!user.pages ?
                <h3 className='profile-pages'>No Posts</h3>
                :
                <h3 className='profile-pages'>Total Pages: {user.pages.length}</h3>
              }
              {currentUserID == user.id 
                ?
                <Link id='edit-link' to={"/edit"}>Edit Profile</Link>
                :
              following === false
                ?
                <button onClick={handleFollow}>Follow</button>
                :
                <button>Unfollow</button>
              }
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