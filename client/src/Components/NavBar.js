import React from 'react';

const Navbar = ({ isLoggedIn, logoutUser, toggleSidebar }) => {
  return (
    <nav className="nav-items">
      <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <button onClick={logoutUser} className='links'>logout</button>
    </nav>
  );
};

export default Navbar;
