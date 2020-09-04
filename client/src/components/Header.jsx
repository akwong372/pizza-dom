import React from 'react';
import {
    BrowserRouter as Router,
    Link
}
    from 'react-router-dom';

const Header = props => {
    return (
        <header className="header">
            <div className="header-items">
                <img src="pizza-slice.svg" className="filter-white" alt="pizza icon" />
                Pizza Thing
        </div>
            {/* <a href="/about" className="about-link">About</a> */}
            <Router>
                <Link
                    className="about-link"
                    to={{
                        pathname: "/about",
                        state: props.storeData
                    }}
                >about</Link>
            </Router>
        </header>
    );
};

export default Header;