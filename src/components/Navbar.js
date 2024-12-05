import React from "react";
import '../style/Navbar.css';
import {Link} from 'react-router-dom';

//Creating a clickable link that nav to home page
const Navbar = () => {
    return(
        <nav>
            <div className="nav-center">
                 <Link to="/">Movie Home</Link> 
            </div>
            <div className="nav-right">
                 <Link to="/favorites">❤️</Link>
            </div>
        </nav>
    )
}

export default Navbar;