import React from 'react';
import { Link } from 'react-router-dom';

import {
  SidebarContenair
} from '../styles/Sidebar.style'

import home from '../assets/home.png';
import training from '../assets/training.png';
import profil from '../assets/profil.png';
import offers from '../assets/offers.png';
import interviews from '../assets/interviews.png';
import logoLogout from '../assets/logout.png';
import go from '../assets/go.png';

const Sidebar = () => {
  return (
    <SidebarContenair>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <div>
                <img src={home}></img>
                <h1>Home</h1>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <div>
                <img src={profil}></img>
                <h1>Profile</h1>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/job-offers">
            <div>
              <img src={offers}></img>
              <h1>Job Offers</h1>
            </div>
            </Link>
          </li>
          <li>
            <Link to="/training">
              <div>
                <img src={training}></img>
                <h1>Training</h1>
              </div>
            </Link>
            <ul>
              <li>
                <Link to="/training/articles">
                  <div>
                    <img src={go}></img>
                    <h1>Articles</h1>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/training/games">
                  <div>
                    <img src={go}></img>
                    <h1>Games</h1>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/interviews">
              <div>
                <img src={interviews}></img>
                <h1>Interviews</h1>
              </div>
            </Link>
            <ul>
              <li>
                <Link to="/interviews/planning">
                  <div>
                    <img src={go}></img>
                    <h1>Planning</h1>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/interviews/articles">
                  <div>
                    <img src={go}></img>
                    <h1>Articles</h1>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </SidebarContenair>
  );
};

export default Sidebar;
