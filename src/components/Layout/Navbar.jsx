import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-flag me-2"></i>CTF PLATFORM
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} me-1`}></i>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/challenges">
                    <i className="fas fa-trophy me-1"></i>Challenges
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="fas fa-crown me-1"></i>Leaderboard
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="accountDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-secret me-1"></i>
                    Account
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="fas fa-id-card me-2"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/teams">
                        <i className="fas fa-users me-2"></i>Team
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item"
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home me-1"></i>Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="fas fa-crown me-1"></i>Leaderboard
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="accountDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i>Account
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="fas fa-sign-in-alt me-2"></i>Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        <i className="fas fa-user-plus me-2"></i>Register
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
