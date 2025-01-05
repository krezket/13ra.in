import React from 'react';
import { Link } from 'react-router-dom'
import './style.css';


export default function Header() {
  return (
        <footer className='footer'>
            <div className='footerbar'>
                <p className='footer-p'>
                    <a className='link-footer' id='footer-ig' href='https://www.instagram.com/krezket/' target="_blank" rel="noreferrer">Instagram</a>
                </p>

                <p className='footer-p'>
                    <a className='link-footer' id='footer-yt' href='https://youtube.com/@krezket' target="_blank" rel="noreferrer">YouTube</a>
                </p>

                <p className='footer-p'>
                    <Link className='link-footer' to={'/about'}>About</Link>
                </p>
                <h1 className='outro'>&copy;2024</h1>
            </div>
        </footer>
  );
};
