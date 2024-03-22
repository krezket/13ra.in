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
                navigate("/" + data.username)
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

    let ID = window.sessionStorage.getItem("userId");

    return (
        <>
            {props.type === "profile" ?
                <header>
                    <Link className='logo-con'>
                        <BlueLogo />
                    </Link>
                    <nav>
                        {ID ?
                            <Link>Log Out</Link>
                            :
                            <>
                                <Link>Sign Up</Link>
                                <Link>Log In</Link>
                            </>
                        }
                    </nav>
                </header>
                // <header className='header'>

                //     <div className='header-div'>

                //         <Link className='home-link' to='/'>
                //             <h1 className='blog-title'>13ra.in</h1>
                //         </Link>

                //         <form className="form" onSubmit={submitHandler}>
                //             <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
                //             <button>Search</button>
                //         </form>                        
                //         <>
                //             {ID ?
                //                 <>
                //                     <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                //                 </>

                //                 :
                //                 <>
                //                     <Link id='login-link' to='/login'>Log In</Link>
                //                 </>
                //             }
                //         </>
                //         <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                //     </div>
                // </header>

                : props.type === "otherProfile" ?
                    <header>
                        <Link className='logo-con'>
                            <BlueLogo />
                        </Link>
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
                    </header>

                    // <header className='header'>

                    //     <div className='header-div'>

                    //         <Link className='home-link' to='/'>
                    //             <h1 className='blog-title'>13ra.in</h1>
                    //         </Link>

                    //         <form className="form" onSubmit={submitHandler}>
                    //             <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
                    //             <button>Search</button>
                    //         </form>
                    //         <>
                    //             {ID ?

                    //                 <>
                    //                     <Link id='logout-link' onClick={toggleModal}>Log Out</Link>
                    //                 </>

                    //                 :
                    //                 <>
                    //                     <Link id='login-link' to='/login'>Log In</Link>
                    //                 </>
                    //             }
                    //         </>
                    //         <Modal modal={modal} logout={logout} toggleModal={toggleModal} />
                    //     </div>
                    // </header>

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