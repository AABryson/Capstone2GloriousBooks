//Checked
import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import GoogleLogoutButton from './GoogleLogoutButton';
import GoogleLoginButton from './GoogleLoginButton';
import ContextObject from './ContextObject'
import './NavBar.css'


function NavBar() {
    
    const {loggedIn} = useContext(ContextObject)

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark' style={{width:'100%'}}>
            <h5 className='navbar-brand' id='brandName'>Glorious Books</h5>
            <div className='collapse navbar-collapse' id='navbarNav'>  
                
                <ul className='navbar-nav' id='leftTitlesSection'>
                    <li className='nav-item'>
                    <NavLink to='/' className='nav-link' id='navlink'>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/author' className='nav-link' id='navlink'>Author</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/subject' className='nav-link' id='navlink'>Subject</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/title' className='nav-link' id='navlink'>Title</NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to='/library' className='nav-link' id='navlink'>Library</NavLink>
                    </li>
                </ul>

                <ul id='googleSignIn'>
                    {/* <li className='nav-item'>
                        <NavLink to='/login' className='nav-link' style={{ color: 'white' }}>Login</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/signup' className='nav-link' style={{ color: 'white' }}>Signup</NavLink>
                    </li> */}
                {!loggedIn ? (
                    <li id='googleLoginButton'><GoogleLoginButton /></li>
                    
                    ) : (
                    <li><GoogleLogoutButton /></li>
                    
                )}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar