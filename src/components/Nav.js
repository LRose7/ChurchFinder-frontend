import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

    return (
        <nav>
            <div className='logo'>
            <img className='logo-icon' src="https://www.transparentpng.com/thumb/church/SqGYE5-church-clipart-photos.png" alt="Church Clipart Photos @transparentpng.com"></img>
            <Link className='routelink' to='/'>
            <h1>Church Finder</h1>
            </Link>
            </div>
            <ul className='nav-links'>
                <Link className='routelink' to='/'>
                    <li><img className='nav-icons' src='home.png' alt='home-icon'></img> Home</li>
                </Link>
                <Link className='routelink' to='/signup'>
                    <li><img className='nav-icons' src='adduser.svg' alt='add-user-icon'></img> Sign Up</li>
                </Link>
                <Link className='routelink' to='/login'>
                    <li><img className='nav-icons' src='login.svg' alt='login-icon'></img> Login</li>
                </Link>
                <Link className='routelink' to='addchurch'>
                    <li><img className='nav-icons' src='add.svg' alt='add-church-icon'></img> Add Church</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
