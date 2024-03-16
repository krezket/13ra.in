import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../LogOutModal';
import API from '../../utils/API';

// import dragonLeft from '../../assets/dragons/reddragon1.gif'
// import dragonRight from '../../assets/dragons/reddragon2.gif'
import './style.css';


export default function Header(props) {
    // console.log(props)
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)

    const [input, setInput] = useState("")

    const handleChange = e => {
        if (e.target.name === "input") {
            setInput(e.target.value)
        }
    }

    const submitHandler = e => {
        e.preventDefault()

        API.getProfileByName(input)
            .then((data) => {
                // CONSOLE LOG //
                // console.log("Get User:", data)
                navigate("/" + data.username)
                // const CrntPgData = JSON.stringify(data)
                // window.sessionStorage.setItem("CrntPgDt", CrntPgData)
            })
            .catch((err) => {
                console.log("oh noes");
                console.log(err);
            });
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

    let ID = window.sessionStorage.getItem("userId")

    return (
        <>
            {props.type === "profile" ?
                <header className='header'>

                    <div className='header-div'>

                        <Link className='home-link' to='/'>
                            <h1 className='blog-title'>13ra.in</h1>
                        </Link>

                        <form className="form" onSubmit={submitHandler}>
                            <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
                            <button>Search</button>
                        </form>                        <>
                            {ID ?
                                <>
                                    <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                                </>

                                :
                                <>
                                    <Link id='login-link' to='/login'>Log In</Link>
                                </>
                            }
                        </>
                        <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                    </div>
                </header>

                : props.type === "otherProfile" ?
                    <header className='header'>

                        <div className='header-div'>

                            <Link className='home-link' to='/'>
                                <h1 className='blog-title'>13ra.in</h1>
                            </Link>

                            <form className="form" onSubmit={submitHandler}>
                                <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
                                <button>Search</button>
                            </form>                            
                            <>
                                {ID ?

                                    <>
                                        <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                                    </>

                                    :
                                    <>
                                        <Link id='login-link' to='/login'>Log In</Link>
                                    </>
                                }
                            </>
                            <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                        </div>
                    </header>

                    : props.type === "edit" ?
                        <header className='header'>
                            <div className='header-div'>
                                <Link className='home-link' to='/'>
                                    <h1 className='blog-title'>13ra.in</h1>
                                </Link>
                                <form className="form" onSubmit={submitHandler}>
                                    <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
                                    <button>Search</button>
                                </form>                                <>
                                    {ID ?
                                        <>
                                            <Link id='profile-link' to={"/" + props.username}>{props.username}</Link>
                                            <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                                        </>
                                        :
                                        <>
                                            <Link id='login-link' to='/login'>Log In</Link>
                                        </>
                                    }
                                </>
                                <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                            </div>
                        </header>

                        : props.type === "post" ?
                            <header className='header'>
                                <div className='header-div'>

                                    <Link className='home-link' to='/'>
                                        <h1 className='blog-title'>13ra.in</h1>
                                    </Link>

                                    <form className="form" onSubmit={submitHandler}>
                                        <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
                                        <button>Search</button>
                                    </form>
                                    <>
                                        {ID ?
                                            <>
                                                <Link id='profile-link' to={"/" + props.username}>{props.username}</Link>
                                                <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                                            </>
                                            :
                                            <>
                                                <Link id='login-link' to='/login'>Log In</Link>
                                            </>
                                        }
                                    </>

                                    <Modal modal={modal} logout={logout} toggleModal={toggleModal} />

                                </div>
                            </header>

                            :
                            <header className='header'>
                                <div className='header-div'>
                                    <Link className='home-link' to='/'>
                                        <h1 className='blog-title'>13ra.in</h1>
                                    </Link>
                                    <form className="form" onSubmit={submitHandler}>
                                        <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
                                        <button>Search</button>
                                    </form>                                    <>
                                        {ID ?
                                            <>
                                                <Link id='profile-link' to={"/&/" + props.username}>{props.username}</Link>
                                                <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                                            </>
                                            :
                                            <>
                                                <Link id='login-link' to='/login'>Log In</Link>
                                            </>
                                        }
                                    </>
                                    <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                                </div>
                            </header>
            }
        </>
    );
};