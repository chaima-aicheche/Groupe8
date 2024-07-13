import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/training">Training</Link>
            <ul>
              <li>
                <Link to="/training/articles">Articles</Link>
              </li>
              <li>
                <Link to="/training/games">Games</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/job-offers">Job Offers</Link>
          </li>
          <li>
            <Link to="/interviews">Interviews</Link>
            <ul>
              <li>
                <Link to="/interviews/planning">Planning</Link>
              </li>
              <li>
                <Link to="/interviews/articles">Articles</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/logout">Log Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
