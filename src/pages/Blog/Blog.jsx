import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer/';
import HomeListView from '../../components/HomeListView/HomeListView';
import HomeGridView from '../../components/HomeGridView/HomeGridView';
import Loading from '../../components/Loading/Loading';
import './Blog.css';

import API from "../../utils/API";

export default function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const [allPages, setAllPages] = useState("")
    // console.log(allPages)
    const [list, setList] = useState("")
    const [grid, setGrid] = useState("")


// DISPLAY ALL PAGES
    useEffect(() => {
        API.getPages()
            .then((data) => {
                // console.log('ALL PAGES:', data)
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

    const formatValueLs = localStorage.getItem('1')
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

            <main className="main-blog">

                {!allPages ?
                    <Loading />
                    :

                    <section className="fp-container" id="fp-con-grid">
                        <div>
                            <button onClick={handleList}>List</button>
                            <button onClick={handleGrid}>Grid</button>
                        </div>

                        {
                            list === 'list-view' || formatValueLs === 'list-view' 
                            ?
                            <HomeListView data={allPages}></HomeListView>
                            :
                            <HomeGridView data={allPages}></HomeGridView>
                        }

                    </section>
                }

            </main>

            <Footer />
        </>
    );
};
