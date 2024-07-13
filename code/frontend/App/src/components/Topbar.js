import React from 'react';
import { Link } from 'react-router-dom';

import {
  TopbarContenair
} from '../styles/Topbar.style'

const Topbar = () => {
  return (
    <TopbarContenair>
        <div>
            Logo
        </div>
        <div>
            <h4>Notif</h4>
            <Link to="/logout">Log Out</Link>
        </div>
    </TopbarContenair>
  );
};

export default Topbar;
