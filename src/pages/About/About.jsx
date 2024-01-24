import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer/';
import welcome from '../../assets/welcome/welcome-11.gif';
import './style.css'

export default function About() {
  return (
    <main>
      <Header></Header>
      <nav className='empty-nav'></nav>

      <section className='main-section'>
        <header className='hp-header'>
          <img id='welcome' src={welcome} alt='welcome'></img>
        </header>

        <article id='hp-article'>
          <p id='home-intro'>Inspired by the styles of the old net, "13rainstorm" is an experimental webpage designed as a simple social media platform. Here a user can create and login to their account, and create pages. ♥ ♦ ♣ ♠</p>
        </article>
      </section>

      <Footer></Footer>
    </main>
  )
}
