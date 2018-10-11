import React from 'react';
import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__logo">
          <Link to="/">
            <h1 className="navbar__title">Evnt</h1>
          </Link>
        </div>
        <div className="navbar__links">
          <NavLink
            to="/eventslist"
            title="Manage your events."
            activeClassName="selected"
          >
            <i className="navbar__icon material-icons">list</i>
          </NavLink>
          <NavLink
            exact
            to="/"
            title="Back to calendar."
            activeClassName="selected"
          >
            <i className="navbar__icon material-icons">insert_invitation</i>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
