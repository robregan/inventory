import React from 'react'
import { RiProductHuntLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './Home.scss'
import heroImg from '../../assets/inv-img.png'

const Home = () => {
  return (
    <div className='home'>
      <nav className='container --flex-between'>
        <div className='logo'>
          <RiProductHuntLine size={35} />
        </div>

        <ul className='home-links'>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <button className='--btn --btn-primary'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
          <li>
            <button className='--btn --btn-primary'>
              <Link to='/dashboard'>Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero section */}
      <section className='hero container'>
        <div className='hero-text'>
          <h2>Inventory & Stock Management Solution</h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            real time. Integrated to make it easier for you to develop your
            business!
          </p>
          <div className='hero-buttons'>
            <button className='--btn --btn-secondary'>
              <Link to='/dashboard'>Free Trial 1 month</Link>
            </button>
          </div>
          <div className='--flex-start'>
            {/* <h4>14k Brand Owners</h4>
            <h4>1.5k Stores</h4>
            <h4>23k Active Users</h4> */}
            {/* <NumberText num='14k' text='Brand Owners' />
            <NumberText num='23k' text='Active Users' />
            <NumberText num='500+' text='Partners' /> */}
          </div>
        </div>
        <div className='hero-image'>
          <img src={heroImg} alt='Inventory' />
        </div>
      </section>
    </div>
  )
}

const numberText = ({ num, text }) => {
  return (
    <div className='--mr'>
      <h3 className='--color-white'>{num}</h3>
      <p className='--color-white'>{text}</p>
    </div>
  )
}
export default Home
