import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div>
        <div>
            Logo
        </div>
        <div>
            <h4>Notif</h4>
            <Link to="/logout">Log Out</Link>
        </div>
    </div>
  );
};

export default Topbar;
