import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import LogIn from '../../pages/LogIn';
import SignUp from '../../pages/SignUp';
import Footer from '../../components/Footer/';
import './style.css';

import { Link } from 'react-router-dom'
import API from "../../utils/API";
import loading from '../../assets/wizbiz/reaplf.gif'
import loading1 from '../../assets/wizbiz/baraduur.gif'
import loading2 from '../../assets/wizbiz/death-demon.gif'
import loading3 from '../../assets/wizbiz/plasmaball.gif'
import loading4 from '../../assets/red/redlightbar.gif'
import loading5 from '../../assets/red/fly-red.gif'
import './fp.css'
import dayjs from 'dayjs';

export default function Home(props) {
    // CONSOLE LOG //
    // console.log("home props:", props)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [allPages, setAllPages] = useState("")
    // console.log(allPages)
    const [createdAt, setCreatedAt] = useState("")
    const date = dayjs(createdAt).format('M/D/YYYY')
    const [list, setList] = useState("")
    const [grid, setGrid] = useState("")
    let loadingArray = [loading, loading1, loading2, loading3, loading4, loading5]
    const random = loadingArray[Math.floor(Math.random() * loadingArray.length)]
    // console.log(random)

// DISPLAY ALL PAGES
    useEffect(() => {
        API.getPages()
            .then((data) => {
                console.log('ALL PAGES:', data)
                setCreatedAt(data.createdAt)
                setAllPages(data)
            })
            .catch((err) => {
                console.log("oh noes");
                console.log(err);
            });
    }, []);

// SWITCHING BETWEEN LIST AND GRID VIEW
    const handleList = () => {
        localStorage.setItem('1', 'list-view')
        setGrid('')
        setList('list-view')
    }
    const handleGrid = () => {
        localStorage.setItem('1', 'grid-view')
        setList('')
        setGrid('grid-view')
    }

    const formatValue = localStorage.getItem('1')
    return (
        <>
            <Header
                userId={props.userId}
                username={props.username}
                setUserId={props.setUserId}
                setEmail={props.setEmail}
                setUsername={props.setUsername}
                setToken={props.setToken}
            />

            <main className="main">

                {!allPages ?

                    <img src={random} alt='loading'></img>
                    :

                    <section className="fp-container">
                        <div>
                            <button onClick={handleList}>List</button>
                            <button onClick={handleGrid}>Grid</button>
                        </div>

                        {list === 'list-view' || formatValue === 'list-view' ?
                            <table className='fp-table'>
                                <tbody>
                                    <tr>
                                        <th className='fp-title' id='less'>Username</th>
                                        <th className='fp-title'>Title</th>
                                        <th className='fp-title' id='less'>Created</th>
                                    </tr>
                                    {allPages.map(({ id, title, users, createdAt }) => (
                                        <tr key={title}>
                                            <td className='fp-data'><Link id='fp-link' to={"/" + users.username}>{users.username}</Link></td>
                                            <td className='fp-data'><Link id='fp-link'to={"/" + users.username + "/" + id}>{title}</Link></td>
                                            <td className='fp-data' id='fp-link'>{dayjs(createdAt).format('M/D/YYYY')}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                            :
                            <div className='fp-section'>
                                {allPages.map(({ id, title, users }) => (
                                    <Link id='fp-link' key={title} onClick={() => props.setPageId(allPages)} to={"/" + users.username + "/" + id}>
                                        <div className='card' key={title}>
                                            <h1>
                                                {title}
                                            </h1>
                                            <div>
                                                {users.username}
                                            </div>
                                            <div>
                                                <p>{date}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                }
                            </div>
                        }

                    </section>
                }

            </main>

            <Footer />
        </>
    );
};