import React from 'react';
import { Link } from 'react-router-dom';

import {
  TopbarContenair,
  TopbarSubContenair
} from '../styles/Topbar.style'

import logo from '../assets/logo.png';
import logoNotif from '../assets/notif.png';
import logoLogout from '../assets/logout.png';

const Topbar = () => {
  return (
    <TopbarContenair>
        <div>
          <img src={logo}></img>
        </div>
        <TopbarSubContenair>
            <div>
              <Link to="/notif">
                <img src={logoNotif}></img>
              </Link>
            </div>
            <div>
              <Link to="/logout">
                <img src={logoLogout}></img>
              </Link>
            </div>
        </TopbarSubContenair>
    </TopbarContenair>
  );
};

export default Topbar;
