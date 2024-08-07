import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import loading from '../../assets/wizbiz/plasmaball.gif'
import trash1 from '../../assets/trash/trash-1-_dragged_.png'
import trash4 from '../../assets/trash/trash-4-_dragged_.svg'
import './style.css'

function Profile(props) {
  console.log("PROFILE PROPS:", props)
  // const [username, setUsername] = useState("");
  const ID = sessionStorage.getItem("userId");
  const [ownerId, setOwnerId] = useState("")
  const [bio, setBio] = useState("");
  const [user, setUser] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    API.getProfile(ID)
      .then((data) => {
        console.log("Get User:", data)
        setUser(data)
      })
      .catch((err) => {
        console.log("oh noes");
        console.log(err);
      });
  }, [ID]);

  const handleChange = e => {
    setOwnerId(ID)
    if (e.target.name === "bio") {
      setBio(e.target.value)
    }
    // else if (e.target.name === "username") {
    //   setUsername(e.target.value)
    // }
  }

  const submitHandlerUsername = e => {
    e.preventDefault()

    API.updateProfile({
      id: ownerId,
      // username:username,
      bio: bio
    }).then(data => {
      console.log(data)
      navigate("/" + props.username);
      window.location.reload(false);

    }).catch(err => {
      console.log(err)
      alert(err)
    })
  }

  const handleDelete = e => {
    e.preventDefault()
    console.log(e.target.name)

    API.deleteUserPage(e.target.name)
      .then(data => {
        console.log(data)
        window.location.reload(false);
        navigate("/" + props.username);
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
      <div className='edit-main-con'>
        <main className='pr-main'>
          <div className='h1-ar'>
            <form onSubmit={submitHandlerUsername}>
              {props.bio === "" ?
                <>
                  <h2>Write a bio</h2>
                  <textarea className='textarea-bio' name='bio' value={bio} onChange={handleChange}></textarea>
                </>
                :
                <textarea className='textarea-bio' name='bio' value={bio} onChange={handleChange}></textarea>
              }
              <button>Submit</button>
            </form>

            {!user ?

              <img src={loading} alt='loading'></img>
              :

              <section className='pr-section'>
                {user.pages.map(({ id, title }) => (
                  <div className='card' key={title}>
                    <Link id='fp-link' key={title} to={"/" + user.username + "/" + id}>{title}</Link>
                    <img src={trash1} alt='trash-can' name={id} onClick={handleDelete}></img>
                  </div>
                ))
                }
              </section>
            }
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Profile;