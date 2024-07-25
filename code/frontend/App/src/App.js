import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Redirect from './pages/redirect';
import Profil from './pages/Profil/profil';
import ProfilCandidat from './pages/Profil/profil';
import ProfilEntreprise from './pages/Profil/candidat';
import ProfilCv from './pages/Profil/cv';
import Notif from './pages/Notif';
import Test from './pages/Test';

import {
  AppContainer,
  AppSubContainer
} from './styles/App.style'

const AppContent = () => {
  const location = useLocation();

  const refreshTokenInterval = 10 * 60 * 1000; // 10 minutes
  const accesTokenInterval = 5 * 60 * 1000; // 5 minutes
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await fetch('/api/refreshtoken', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to refresh access token');
        }

        const data = await response.json();
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        } else {
          throw new Error('Failed to refresh access token');
        }
      } catch (error) {
        console.error('Error refreshing access token:', error);
        window.location.href = 'https://auth.techtalent.fr';
      }
    };

    const interval = setInterval(refreshAccessToken, refreshTokenInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {location.pathname !== '/Redirect' && <Topbar />}
      <AppContainer>
      {location.pathname !== '/Redirect' && <Sidebar />}
        <AppSubContainer>
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/Redirect" element={<Redirect />} />
            <Route path="/Notif" element={<Notif />} />
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
