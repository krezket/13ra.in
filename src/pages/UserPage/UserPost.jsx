import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import thumbup from '../../assets/wizbiz/thumbup.gif'
import thumbdown from '../../assets/wizbiz/thumbdown.gif'
import './style.css'
import API from "../../utils/API";

export default function UserPage(props) {
    console.log("UserPage Props:", props);

    const [newPage, setNewPage] = useState({})
    const [username, setUsername] = useState("")
    const [postDate, setPostDate] = useState([{}])
    const date = dayjs(postDate).format('M/D/YYYY h:mm a')
    const [commentData, setCommentData] = useState([{}])

    const pathArr = window.location.pathname.split('/');
    let path = pathArr[2].split('/').pop()

    const [text, setText] = useState("")
    const handleChange = e => {
        if (e.target.name === "text") {
            setText(e.target.value)
        }
    }

    useEffect(() => {
        API.getPage(path)
            .then((data) => {
                setNewPage(data)
                setUsername(data.users.username)
                setPostDate(data.createdAt)
                setCommentData(data.comments)
            })
            .catch((err) => {
                console.log("oh noes");
                console.log(err);
            });
    }, [path]);

    const submitHandler = e => {
        e.preventDefault()
        props.token === '' ?
            alert('Must be signed in to comment!')
            :
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
        window.location.reload(false)
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

            <div className="post-con">

                <main className='page-main'>
                    <div className='title-div'>
                        <h1 className='page-title'>{newPage.title}</h1>
                        <h3 className='page-username'>
                            <Link to={"/" + username} id='user-link'>{username}</Link>
                        </h3>
                    </div>
                    <p className='page-text'>{newPage.text}</p>
                    <div className='date-div'>
                        <p className='dayjs'>{date}</p>
                    </div>
                </main>

                <div className="like-con">
                    <h3>{newPage.likes}</h3>
                    <button><img src={thumbup} alt="Like" /></button>
                    <h3>{newPage.dislikes}</h3>
                    <button><img src={thumbdown} alt="Dislike" /></button>
                </div>

                <div className='comment-div'>
                    <h2>Comments</h2>
                    {commentData == '' ?
                        <p>No Comments Yet</p>
                        :
                        commentData.map(({ id, text, users, createdAt }) => (
                            <div key={id}>
                                <Link to={users && '/' + users.username}>
                                    <h3 className='page-username'>{users && users.username}</h3>
                                </Link>
                                <p>{text}</p>
                                <p>{dayjs(createdAt).format('M/D/YYYY h:mm a')}</p>
                            </div>
                        ))
                    }
                    <form onSubmit={submitHandler}>
                        <textarea cols="50" name='text' placeholder='Add a comment' value={text} onChange={handleChange}></textarea>
                        <button>Comment</button>
                    </form>
                </div>
            </div>
        </>
    )
}