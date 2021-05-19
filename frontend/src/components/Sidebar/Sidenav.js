import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import Logo from '../Logo';
import './Sidenav.css'

export default function Sidenav() {
  const [sidebar, setSidebar] = useState(false)

  const toggleSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaBars onClick={toggleSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle' onClick={toggleSidebar}>
              <Link to='#' className='menu-bars-close'>
                <AiOutlineClose />
              </Link>
            </li>
            <div className="logo">
              <Logo/>
            </div>
            <br />
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className="nav-text">
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}