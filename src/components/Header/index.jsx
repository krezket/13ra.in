import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../LogOutModal';
import BlueLogo from './blueLogo';
import API from '../../utils/API';
import './style.css';


export default function Header(props) {
    console.log("header props:", props)
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)

    // const [input, setInput] = useState("")

    // const handleChange = e => {
    //     if (e.target.name === "input") {
    //         setInput(e.target.value)
    //     }
    // }

    // const submitHandler = e => {
    //     e.preventDefault()

    //     API.getProfileByName(input)
    //         .then((data) => {
    //             navigate("/" + data.username)
    //         })
    //         .catch((err) => {
    //             console.log("oh noes");
    //             console.log(err);
    //         });
    // }

    const toProfile = () => {
        window.location.reload(true);
        navigate("/" + props.username)
    }

    const toggleModal = () => {
        setModal(!modal)
    };

    const logout = () => {
        setModal(!modal)
        props.setUserId(0);
        props.setUsername("");
        props.setToken("");
        props.setEmail("");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("userId");
        window.sessionStorage.removeItem("UserData");
        navigate("/");
        window.location.reload(false);
    };

    const ID = window.sessionStorage.getItem("userId");
    // console.log("ID:", ID)

    return (
        <>
            {props.type === "profile" ?
                <header>
                    <div className='logo-con'>
                        <Link to='/st0rm'>
                            <BlueLogo />
                        </Link>
                    </div>
                    <nav>
                        {ID ?
                            <>
                                <Link id='profile-link' onClick={toProfile}>{props.username}</Link>
                                <Link onClick={toggleModal}>Log Out</Link>
                            </>
                            :
                            <>
                                <Link to='/signup'>Sign Up</Link>
                                <Link to='/login'>Log In</Link>
                            </>
                        }
                    </nav>
                    <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                </header>

                : props.type === "edit" ?
                    <header>
                        <div className='logo-con'>
                            <Link to='/st0rm'>
                                <BlueLogo />
                            </Link>
                        </div>
                        <nav>
                            {ID ?
                                <Link onClick={toggleModal}>Log Out</Link>
                                :
                                <>
                                    <Link to='/signup'>Sign Up</Link>
                                    <Link to='/login'>Log In</Link>
                                </>
                            }
                        </nav>
                        <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                    </header>

                    : props.type === "post" ?
                        <header>
                            <div className='logo-con'>
                                <Link to='/st0rm'>
                                    <BlueLogo />
                                </Link>
                            </div>
                            <nav>
                                {ID ?
                                    <>
                                        <Link id='profile-link' to={"/" + props.username}>{props.username}</Link>
                                        <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                                    </>
                                    :
                                    <>
                                        <Link to='/signup'>Sign Up</Link>
                                        <Link to='/login'>Log In</Link>
                                    </>
                                }
                            </nav>
                            <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                        </header>

                        :
                        <header>
                            <div className='logo-con'>
                                <Link to='/st0rm'>
                                    <BlueLogo />
                                </Link>
                            </div>
                            <nav>
                                {ID ?
                                    <>
                                        <Link id='profile-link' to={"/" + props.username}>{props.username}</Link>
                                        <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                                    </>
                                    :
                                    <>
                                        <Link to='/signup'>Sign Up</Link>
                                        <Link to='/login'>Log In</Link>
                                    </>
                                }
                            </nav>
                            <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                        </header>

            }
        </>
    );
};