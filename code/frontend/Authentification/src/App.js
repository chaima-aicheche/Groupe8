import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Home from './pages/home';
import RegisterEntreprise from './pages/registerEntreprise';
import RegisterCandidat from './pages/registerCandidat';
import Contact from './pages/contact';
import ResetPassword from './pages/resetPassword';
import Redirect from './pages/redirect';

import Navbar from './components/navbar';
import Footer from './components/footer';

import GitHub from './pages/github';

import {
  AppBody,
} from './styles/commun.style';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/Redirect' && <Navbar />}
      <AppBody>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Redirect" element={<Redirect />} />
          <Route path="/RegisterEntreprise" element={<RegisterEntreprise />} />
          <Route path="/RegisterCandidat" element={<RegisterCandidat />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/github" element={<GitHub />} />
        </Routes>
      </AppBody>
      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
