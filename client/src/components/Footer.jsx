import React from 'react';

const Footer = () => {
    const dateYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <small>&copy; Copyright {dateYear}</small>
        </footer>
    )
};

export default Footer;