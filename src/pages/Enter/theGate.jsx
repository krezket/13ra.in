import React from 'react';
import './style.css'
import { Link } from 'react-router-dom'
import enter from '../../assets/enter/enter-6.gif'
import smokeskull from '../../assets/death/smokeskull.gif'
import Logo from '../../components/Header/blueLogo.jsx'

function Enter() {
  return (
    <div className='enter'>
      <Logo></Logo>
      <Link to='/storm13'>
        <img className='btn' src={enter} alt='enter-here'></img>
      </Link>
    </div>
  );
};

export default Enter