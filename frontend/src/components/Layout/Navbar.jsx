import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FaTasks className="logo-icon" />
          <span>TaskManager</span>
        </Link>

        <div className="nav-items">
          <span className="welcome-text">Welcome, {user?.name}</span>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;