import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <p>
        <span><Link to="/">Home</Link></span>
        <span><Link to="/about">About</Link></span>
    </p>
)

export default Header;