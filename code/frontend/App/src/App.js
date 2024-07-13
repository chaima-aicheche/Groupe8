import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Test from './pages/Test';

import {
  AppContainer,
  AppSubContainer
} from './styles/App.style'

const App = () => {
  return (
    <Router>
      <Topbar />
      <AppContainer>
        <Sidebar />
        <AppSubContainer>
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/profile" element={<Test />} />
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
    </Router>
  );
};

export default App;
