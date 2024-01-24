import React, { useEffect } from 'react';
import Header from "../../components/Header";
import Search from "../../components/Search/Search"
import FrontPage from '../../components/FrontPage/FrontPage';
import Footer from '../../components/Footer/';
import './style.css';

export default function Home(props) {
    // CONSOLE LOG //
    // console.log("home props:", props)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

            <nav className='empty-nav'> <Search/></nav>


            <main className="main">

                <FrontPage />

            </main>

            <Footer />
        </>
    );
};