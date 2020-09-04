import React from 'react';
import {
    BrowserRouter as Router,
    Link
}
    from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-items">
                <img src="pizza-slice.svg" className="filter-white" alt="pizza icon" />
                Pizza Thing
        </div>
            <Link
                className="about-link"
                to={{
                    pathname: "/about"
                }}
            >about</Link>
        </header>
    );
};

export default Header;