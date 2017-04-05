import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            { " | " }
            <IndexLink to="/about" activeClassName="active">About</IndexLink>
        </nav>
    );
};

export default Header;