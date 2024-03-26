import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer/';
import HomeListView from '../../components/HomeListView/HomeListView';
import HomeGridView from '../../components/HomeGridView/HomeGridView';
import './style.css';

import API from "../../utils/API";
import loading from '../../assets/wizbiz/reaplf.gif'
import loading1 from '../../assets/wizbiz/baraduur.gif'
import loading2 from '../../assets/wizbiz/death-demon.gif'
import loading3 from '../../assets/wizbiz/plasmaball.gif'
import loading4 from '../../assets/red/redlightbar.gif'
import loading5 from '../../assets/red/fly-red.gif'

export default function Home(props) {
    // CONSOLE LOG //
    // console.log("home props:", props)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [allPages, setAllPages] = useState("")
    // console.log(allPages)
    const [list, setList] = useState("")
    const [grid, setGrid] = useState("")

    let loadingArray = [loading, loading1, loading2, loading3, loading4, loading5]
    const random = loadingArray[Math.floor(Math.random() * loadingArray.length)]

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

            <main className="main">

                {!allPages ?

                    <img src={random} alt='loading'></img>
                    :

                    <section className="fp-container">
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