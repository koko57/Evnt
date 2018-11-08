import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';
import './Navbar.scss';

const Navbar = props => {
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
            title="Manage your events"
            activeClassName="selected"
            className="navbar__link"
          >
            <i className="navbar__icon material-icons" id="list">
              list
            </i>
          </NavLink>
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
          <NavLink to="/welcome" title="Log Out" onClick={props.signOut} className="navbar__link">
            <i className="navbar__icon material-icons" id="calendar">
              power_settings_new
            </i>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(
  connect(
    null,
    { signOut }
  )(Navbar)
);
