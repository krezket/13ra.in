import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import loading from '../../assets/banana.gif'
import API from '../../utils/API';
import "./Profile.css"

export default function Profile(props) {
  // console.log("Other Profile:", props);

  const currentUserID = sessionStorage.getItem("userId");
  // console.log(currentUserID);

  const [user, setUser] = useState("");

  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  console.log("who are his follwers?", currentUserFollowing)
  // console.log(Array.isArray(currentUserFollowing))

  const pathArr = window.location.pathname.split('/');
  let path = pathArr[1].split('/').pop();

  const [following, setFollowing] = useState(null);

  // GET PROFILE BY USERNAME
  useEffect(() => {
    if (!currentUserID) {
      API.getProfileByName(path)
        .then((data) => {
          setUser(data)
        })
        .catch((err) => {
          console.log("oh noes");
          console.log(err);
        });
    }
    else {
      API.getProfileByName(path)
        .then((data) => {
          setUser(data)
          setCurrentUserFollowing(data.followers)
        })
        .catch((err) => {
          console.log("oh noes");
          console.log(err);
        });
    }
  }, [currentUserID, path]);

  // FOLLOW
  const handleFollow = e => {
    e.preventDefault()
    if (user.id && props.userId === null) {
      alert('Sign in to follow')
    }
    else (
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
    )

  }

  // UNFOLLOW
  const handleUnfollow = e => {
    e.preventDefault()

    API.removeFollow({
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

  // CHECK IF FOLLOWING
  useEffect(() => {
    const foundUser = currentUserFollowing.find(obj => obj.id == currentUserID)
    console.log('Found:', foundUser);
    if (foundUser) {
      setFollowing(true)
      console.log('Found object:', foundUser);
    } else {
      setFollowing(false)
      console.log('Object not found');
    }
  }, [currentUserFollowing, user.id])

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
                        
            <h1 className='profile-username'>{user.username}</h1>

            <div className='usr-fri'>
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
              <>
                <h3 className='profile-pages'>No Posts</h3>
              </>
                :
                <h3 className='profile-pages'>Total Pages: {user.pages.length}</h3>
              }

              {currentUserID == user.id ?
                <Link id='edit-link' to={"/edit"}>Edit Profile</Link>
                :
                following === false
                  ?
                  <button onClick={handleFollow}>Follow</button>
                  :
                  <button onClick={handleUnfollow}>Unfollow</button>
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
