import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="header-items">
                <img src="pizza-slice.svg" className="filter-white" alt="pizza icon" />
                Pizza Thing
        </div>
            <a href="/about" className="about-link">About</a>
        </header>
    );
};

export default Header;