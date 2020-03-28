import React from 'react'
import {Link} from 'react-router-dom'
import Models from './Models'
import { NavLink } from 'react-router-dom'



const Navbar = () => {

    
    return(
        <nav className = "nav-wrapper grey darken-3">
            <div id = "nav" className = "container" >
                <Link to ='/' className ="brand-logo">SoccerBase</Link>
                <Models />
                <img src="../../Logo2.png" class="rotate" width="100" height="100" style={{
        // paddingTop: '20px',
        }}/>
            </div>
        </nav>
    )
               
}

export default Navbar;