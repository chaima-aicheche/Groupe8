import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/home';
import RegisterEntreprise from './pages/registerEntreprise';
import RegisterCandidat from './pages/registerCandidat';
import Contact from './pages/contact';
import ResetPassword from './pages/resetPassword';

import Navbar from './components/navbar';
import Footer from './components/footer';

import {
  AppBody,
} from './styles/commun.style';


const App = () => {
  return (
    <Router>
      <Navbar />
      <AppBody>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegisterEntreprise" element={<RegisterEntreprise />} />
          <Route path="/RegisterCandidat" element={<RegisterCandidat />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </AppBody>
      <Footer />
    </Router>
  );
};

export default App;
