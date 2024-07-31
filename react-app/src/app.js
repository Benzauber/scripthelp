import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import AddFunction from './AddFunction';
import SearchFunction from './SearchFunction';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className='link'>
            <li>
              <NavLink
                to="/new"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Add Function
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Search Functions
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/new" element={<AddFunction />} />
          <Route path="/" element={<SearchFunction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
