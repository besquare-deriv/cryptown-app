import React, { Component, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useLogout } from '../../hooks/useLogout';
import '../navbar/navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from '../../hooks/useAuthContext';
import logo  from '../../asset/logoA.png'
import { useProfileContext } from '../../hooks/useProfileContext';

const Navbar = () => {
  
  const { user } = useAuthContext();
  const { profile } = useProfileContext() 
  const [name, setName] = useState('');
  const { logout } = useLogout();

  useEffect(()  => {
    const updateName = localStorage.getItem('username');
    if (updateName){
      setName(updateName.slice(1, -1));
    }
  }, [])

      //logout user
  const handleClick = async () => {
    await logout();
  };


    return (
      <div className='first-col'>
        { user && (
          <nav className="nav-up">
          <ul>
         <Link to ='/market' className="nav-text"> 
         {/* <img className='logoclass' src = { logo } width='60%' /> */}
         <img src = { logo } width='60%'/>
          </Link>
         </ul>
        <ul className="nav-right">
            <Link to ='/market' className="nav-text">  Market </Link>
            <Link to = '/watchlist' className="nav-text"> Watchlist </Link>
            <Link to ='/forum' className="nav-text">  Forum </Link>
            <Link to = '/news' className="nav-text">  News </Link>
            <Link to = '/appList' className="nav-text"> Exchange </Link>
        </ul>
        <ul className="nav-right">
        <Link to = '/profile' className="nav-text">
            <FaUserCircle /> <span className='name-col'>{profile ? profile["username"] : name}</span>
        </Link>
        <Link onClick={handleClick} className="nav-text"> Logout </Link>
        </ul>
        </nav>
        )}

        { !user && (
        <nav className="nav-up">
        <Link to ='/market' className="nav-text"> 
         <img src = { logo } width='60%'/>
        </Link>

        <ul className="nav-right">
            <Link to ='/market' className="nav-text">  Market </Link>
            <Link to ='/forum' className="nav-text">  Forum </Link>
            <Link to = '/news' className="nav-text">  News </Link>
            <Link to = '/appList' className="nav-text"> Exchange </Link>
            <Link to = '/login' className="nav-text"> Login </Link>
          </ul>
       </nav>
        )}
    </div>
    )
  }

export default Navbar;