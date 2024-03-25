import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import './HomeGridView.css'

export default function HomeGridView(props) {
    const allPages = props

    return (
        <div className='fp-section'>
            {allPages.data.map(({ id, title, users, createdAt }) => (
                <Link id='fp-link' key={title} onClick={() => props.setPageId(allPages)} to={"/" + users.username + "/" + id}>
                    <div className='card' key={title}>
                        <h1>
                            {title}
                        </h1>
                        <div>
                            {users.username}
                        </div>
                        <div>
                            <p>{dayjs(createdAt).format('M/D/YYYY')}</p>
                        </div>
                    </div>
                </Link>
            ))
            }
        </div>
    )
}
