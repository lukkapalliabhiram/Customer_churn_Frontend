import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#282c34',
        padding: '1rem',
    };

    const logoStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.5rem',
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '1rem',
    };

    const navLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={logoStyle}>
                Churn It
            </Link>
            <nav style={navLinksStyle}>
                <Link to="/" style={navLinkStyle}>
                    Home
                </Link>
                <Link to="/filter_search" style={navLinkStyle}>
                    Filter & Search
                </Link>
                <Link to="/visualizations" style={navLinkStyle}>
                    Visualizations
                </Link>
                <Link to="/data" style={navLinkStyle}>
                Data Entry 
                </Link>
                {/* <Link to="/help" style={navLinkStyle}>
                    Help
                </Link> */}
            </nav>
        </header>
    );
};

export default Header;
