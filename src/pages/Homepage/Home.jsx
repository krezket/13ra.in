import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer/';
import { Link } from 'react-router-dom'
import './style.css';

export default function Home(props) {
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
                <Link to='/blog'>Blog</Link>
            </main>

            <Footer />
        </>
    );
};
