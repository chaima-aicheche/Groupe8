import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactUs from './components/pages/ContactUs';
import RegisterRecruiter from './components/pages/RegisterRecruiter';
import RegisterCandidate from './components/pages/RegisterCandidate';
import ResetPassword from './components/pages/ResetPassword';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Switch>
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/register-candidate" component={RegisterCandidate} />
          <Route path="/register-recruiter" component={RegisterRecruiter} />
          <Route path="/reset-password" component={ResetPassword} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
