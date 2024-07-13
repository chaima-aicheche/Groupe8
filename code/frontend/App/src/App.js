import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Redirect from './pages/Redirect';
import Profil from './pages/Profil/Profil';
import ProfilCandidat from './pages/Profil/Profil';
import ProfilEntreprise from './pages/Profil/Candidat';
import ProfilCv from './pages/Profil/Cv';
import Test from './pages/Test';

import {
  AppContainer,
  AppSubContainer
} from './styles/App.style'

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/Redirect' && <Topbar />}
      <AppContainer>
      {location.pathname !== '/Redirect' && <Sidebar />}
        <AppSubContainer>
          <Routes>
            <Route path="/" element={<Profil />} />
            <Route path="/Redirect" element={<Redirect />} />
            <Route path="/Notif" element={<Test />} />
            <Route path="/Profil/*" element={<Profil />}>
                <Route path="Candidat" element={<ProfilCandidat />} />
                <Route path="CuriculumVitae" element={<ProfilEntreprise />} />
                <Route path="Entreprise" element={<ProfilCv />} />
            </Route>
            <Route path="/JobOffers" element={<Test />} />
            <Route path="/Interviews" element={<Test />}>
              <Route path="Planning" element={<Test />} />
              <Route path="articles" element={<Test />} />
            </Route>
            <Route path="/Training" element={<Test />}>
              <Route path="Games" element={<Test />} />
              <Route path="Articles" element={<Test />} />
            </Route>
          </Routes>
        </AppSubContainer>
      </AppContainer>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
