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
import Profil from './pages/Profil';
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
          <Route path="/" element={<Test />} />
          <Route path="/Redirect" element={<Redirect />} />
          <Route path="/notif" element={<Test />} />
          <Route path="/profile" element={<Profil />} />
            <Route path="/job-offers" element={<Test />} />
            <Route path="/interviews" element={<Test />}>
              <Route path="planning" element={<Test />} />
              <Route path="articles" element={<Test />} />
            </Route>
            <Route path="/training" element={<Test />}>
              <Route path="games" element={<Test />} />
              <Route path="articles" element={<Test />} />
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
