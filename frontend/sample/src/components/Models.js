import React from 'react'
import { NavLink } from 'react-router-dom'
import {Link} from 'react-router-dom'

const Models = () => {
  return (
      <ul className="options" class = "options" style={{
        paddingLeft: '200px',
      }}>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/Teams'>Teams</NavLink></li>
        <li><NavLink to='/Leagues'>Leagues</NavLink></li>
        <li><NavLink to='/Players'>Players</NavLink></li>
        <li style={{
        paddingLeft: '360px',
        paddingRight: '20px'
      }}><NavLink to='./aboutUs'>About Us</NavLink></li>

        {/* <li><NavLink to='/' className="btn btn-floating pink lighten-1">NN</NavLink></li> */}
      </ul>
  )
}

export default Models