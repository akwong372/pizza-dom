import React from 'react';

const Footer = () => {
    const dateYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <small>&copy; Copyright {dateYear}, <a href="https://github.com/akwong372">Alvin Kwong</a></small>
        </footer>
    )
};

export default Footer;