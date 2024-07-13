import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Test from './pages/Test';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
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
        </div>
      </div>
    </Router>
  );
};

export default App;
