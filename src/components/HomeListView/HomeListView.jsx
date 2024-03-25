import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import './homeListView.css'

export default function HomeListView(props) {
    const allPages = props
    
    return (
        <table className='fp-table'>
            <tbody>
                <tr>
                    <th className='fp-title' id='less'>Username</th>
                    <th className='fp-title'>Title</th>
                    <th className='fp-title'>Comments</th>
                    <th className='fp-title' id='less'>Created</th>
                </tr>
                {allPages.data.map(({ id, title, users, comments, createdAt }) => (
                    <tr key={title}>
                        <td className='fp-data'>
                            <Link id='fp-link' to={"/" + users.username}>{users.username}</Link>
                        </td>
                        <td className='fp-data'>
                            <Link id='fp-link' to={"/" + users.username + "/" + id}>{title}</Link>
                        </td>
                        <td className='fp-data' id='fp-link'>{comments.length}</td>
                        <td className='fp-data' id='fp-link'>{dayjs(createdAt).format('M/D/YYYY')}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}