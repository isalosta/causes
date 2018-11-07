'use strict'
import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        const user = this.props.user_data;
        return (
            <nav id='HEADER-CORE' className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <a className='navbar-brand'> 
                    <Link to="/">
                        <img src='/static/images/cause_logo.png'/>
                    </Link>
                </a>
                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#header-btn" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className='navbar-collapse collapse' id='header-btn'>
                    <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                        <li className='nav-item active'> 
                            <Link to="/" className='nav-link'>HOME</Link>
                        </li>
                        <li className='nav-item active'>
                            <Link to="/race" className='nav-link'> RACE </Link>
                        </li>
                        <li className='nav-item active'>
                            <a className='nav-link'> ABOUT US </a>
                        </li>
                        <li className='nav-item active'>
                            <a className='nav-link'> BLOG </a>
                        </li>
                        <li className='nav-item active'>
                            <a className='nav-link'> CONTACT </a>
                        </li>
                        <li className='nav-item active'>
                            {user === 'GUEST' ? <a className='nav-link'> <Link to="/login"> LOG IN </Link> </a> : <a className='nav-link'>{user}</a> }
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;