import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';
import './Navbar.scss';

const Navbar = ({ signOut, location }) => {
  const navlink =
    location.pathname === '/' ? (
      <NavLink
        to="/eventslist"
        title="Manage your events"
        activeClassName="selected"
        className="navbar__link"
        onClick={() => console.log(location)}
      >
        <i className="navbar__icon material-icons" id="list">
          list
        </i>
      </NavLink>
    ) : (
      <NavLink
        exact
        to="/"
        title="Back to calendar"
        activeClassName="selected"
        className="navbar__link"
      >
        <i className="navbar__icon material-icons" id="calendar">
          insert_invitation
        </i>
      </NavLink>
    );
  return (
    <nav className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__logo">
          <Link to="/">
            <h1 className="navbar__title">Evnt</h1>
          </Link>
        </div>
        <div className="navbar__links">
          {navlink}
          <NavLink
            to="/welcome"
            title="Log Out"
            onClick={signOut}
            className="navbar__link"
          >
            <i className="navbar__icon material-icons" id="calendar">
              power_settings_new
            </i>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { signOut }
  )(Navbar)
);
