import React from 'react';
import './LandingPage.css';
import logo from '../../assets/forecast-sun-sunrise-svgrepo-com.svg'
import arrow from '../../assets/arrow.svg'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate()

    return (
        <div className='landing'>
            <div className="title">
                <div className="title-container">
                    <img width='250px' height='200px' src={logo} alt="logo" /> &nbsp; <h1><span>W</span>eather<span>F</span>inder</h1>
                </div>
            </div>
            <div className="desc text-center">
                <h3 className="sub-title">
                    Know the <span>Weather</span> around you
                </h3>
                <p className='text'>application that can help to carry out your activities</p>
            </div>
            <div className="button-area">
                <button className="btn-1" onClick={()=>navigate('/weather')}>
                    <div>GET STARTED</div>
                    <img src={arrow} alt="arrow" />
                </button>
            </div>
        </div>
    );
};


export default LandingPage;