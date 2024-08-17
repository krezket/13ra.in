import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer/';
import { Link } from 'react-router-dom';
import Book from '../../assets/book0.gif';
import Portfolio from '../../assets/cats/cat-2.gif';
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
                <Link to="/blog" className="grid-item">
                    <img src={Book} alt='Blog'/>
                    <p>Blog</p>
                </Link>

                <Link to="https://krezket.net" className="grid-item">
                    <img src={Portfolio} alt='Portfolio'/>
                    <p>Portfolio</p>
                </Link>

                <Link to="" className="grid-item">
                </Link>

                <Link to="" className="grid-item">
                </Link>

                <Link to="" className="grid-item">
                </Link>

                <Link to="" className="grid-item">
                </Link>

                <Link to="" className="grid-item">
                </Link>

                <Link to="" className="grid-item">
                </Link>

                <Link to="" className="grid-item">
                </Link>

                <Link to="" className="grid-item">
                </Link>

            </main>

            <Footer />
        </>
    );
};
