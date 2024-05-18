import React from 'react';
import './Navbar.css'
import avatar from '../../assets/profile.jpg'
import { Link } from 'react-router-dom';
import logo from '../../assets/forecast-sun-sunrise-svgrepo-com.svg'

const Navbar = () => {
    return (
        <div className="nav-container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container" style={{ maxWidth: "1200px" }}>
                    <Link className="navbar-brand" to='/'><img width='50px' height='60px' src={logo} alt="logo" /> &nbsp; <h3><span>W</span>eather<span>F</span>inder</h3></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/weather">Home</Link>
                            </li>
                            <li className="nav-item mx-4">
                                <Link className="nav-link active" aria-current="page" to="/map">Map</Link>
                            </li>
                            <li className="nav-item">
                                <img src={avatar} alt="user-logo" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;