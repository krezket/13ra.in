import React, { useState, useEffect } from 'react';
// import { useGetAllPagesQuery } from '../../redux/features/pagesSlice';
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs';
import API from "../../utils/API";
import loading from '../../assets/wizbiz/reaplf.gif'
import loading1 from '../../assets/wizbiz/baraduur.gif'
import loading2 from '../../assets/wizbiz/death-demon.gif'
import loading3 from '../../assets/wizbiz/plasmaball.gif'
import loading4 from '../../assets/red/redlightbar.gif'
import loading5 from '../../assets/red/fly-red.gif'
import './fp.css'

export default function FrontPage() {

    const [pages, setPages] = useState("")
    const [list, setList] = useState("")
    const [grid, setGrid] = useState("")
    // console.log(pages)

    let loadingArray = [loading, loading1, loading2, loading3, loading4, loading5]

    const random = loadingArray[Math.floor(Math.random() * loadingArray.length)]
    // console.log(random)

    useEffect(() => {
        API.getPages()
            .then((data) => {
                // console.log('pages data:', data)
                setPages(data)
            })
            .catch((err) => {
                console.log("oh noes");
                console.log(err);
            });
    }, []);

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
    // const setList = () => {
    // }

    // const setGrid = () => {
    // }

    const pageValue = localStorage.getItem('1')

    return (
        <>
            {!pages ?

                <img src={random} alt='loading'></img>
                :

                <section className="fp-container">
                    <div>
                        <button onClick={handleList}>List</button>
                        <button onClick={handleGrid}>Grid</button>
                    </div>

                    {list === 'list-view' || pageValue === 'list-view' ?
                    <table className='fp-table'>
                        <tbody>
                            <tr>
                                <th className='fp-title' id='less'>Username</th>
                                <th className='fp-title'>Title</th>
                                <th className='fp-title' id='less'>Created</th>
                            </tr>
                            {pages.map(({ id, title, users, createdAt }) => (
                                <tr key={title}>
                                    {/* LINK TO PROFILE */}
                                    <td className='fp-data'><Link id='fp-link' to={"/&/" + users.username}>{users.username}</Link></td>
                                    {/* LINK TO THE PAGE */}
                                    <td className='fp-data'><Link id='fp-link' to={"/" + users.username + "/" + id}>{title}</Link></td>
                                    {/* DATE */}
                                    <td className='fp-data'><DayJS id='fp-link' format="M/D/YYYY">{createdAt}</DayJS></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    :
                    <div className='fp-section'>
                        {pages.map(({ id, title, users, createdAt }) => (
                            <Link id='fp-link' key={title} to={"/" + users.username + "/" + id}>
                                <div className='card' key={title}>
                                    <div>
                                        {title}
                                    </div>
                                    <div>
                                        {users.username}
                                    </div>
                                    <div>
                                        <DayJS className="dayjs" format="M/D/YYYY">{createdAt}</DayJS>
                                    </div>
                                </div>
                            </Link>
                        ))
                        }
                    </div>
                    }
                    
                </section>
            }
        </>
    )
}
