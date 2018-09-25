import React from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

import './Navbar.scss';

const Navbar = props => {
  return (
    <nav className="navbar">
      <div className="navbar--wrapper">
        <div className="row">
          <Link to="/" className="col s4">
            <h1>Evnt</h1>
          </Link>
          <Link
            to="/eventslist"
            title="Manage your events."
            className="col offset-s4 s4"
          >
            <Icon>list</Icon>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
