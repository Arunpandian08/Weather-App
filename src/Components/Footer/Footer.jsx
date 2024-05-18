import React from 'react';
import './Footer.css'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear();
    return (
        <div className='footer'>
            <div className="text">
                <p> {year} &copy; Copy Rights Reserved </p>
            </div>
        </div>
    );
};

export default Footer;