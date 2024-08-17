import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import './HomeGridView.css'

export default function HomeGridView(props) {
    const allPages = props

    return (
        <div className='fp-grid'>
            {allPages.data.map(({ id, title, users, createdAt }) => (

                <Link className='fp-grid-link' key={title} onClick={() => props.setPageId(allPages)} to={"/" + users.username + "/" + id}>
                    <h1>{title}</h1>
                    <p>{users.username}</p>
                    <p>{dayjs(createdAt).format('M/D/YYYY')}</p>
                </Link>
            ))
            }
        </div>
    )
}
