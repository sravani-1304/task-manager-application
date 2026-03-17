import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTasks, 
  FaRocket, 
  FaCheckCircle,
 
  FaChartLine,
  FaArrowRight,
  FaMoon,
  FaSun,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaFilter,
  FaSearch,
  FaTag,
  FaCalendarAlt,
  FaBell,
  FaUserCheck,
  FaLayerGroup,
  FaCog,
  FaShieldAlt
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Homepage.css';

const Homepage = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const features = [
    {
      icon: <FaPlusCircle className="feature-icon" />,
      title: "Create Tasks",
      description: "Easily create new tasks with title, description, priority level, and due date."
    },
    {
      icon: <FaEdit className="feature-icon" />,
      title: "Edit & Update",
      description: "Modify your tasks anytime. Update details, change priority, or extend due dates."
    },
    {
      icon: <FaTrashAlt className="feature-icon" />,
      title: "Delete Tasks",
      description: "Remove completed or unwanted tasks with a single click."
    },
    {
      icon: <FaCheckCircle className="feature-icon" />,
      title: "Mark Complete",
      description: "Track your progress by marking tasks as complete or pending."
    },
    {
      icon: <FaFilter className="feature-icon" />,
      title: "Filter Tasks",
      description: "Filter tasks by status (All/Completed/Pending) and priority (High/Medium/Low)."
    },
    {
      icon: <FaSearch className="feature-icon" />,
      title: "Search Tasks",
      description: "Quickly find specific tasks by searching through titles."
    },
    {
      icon: <FaTag className="feature-icon" />,
      title: "Priority Levels",
      description: "Assign High, Medium, or Low priority to organize your most important tasks."
    },
    {
      icon: <FaCalendarAlt className="feature-icon" />,
      title: "Due Dates",
      description: "Set due dates for tasks and get visual indicators for overdue items."
    },
    {
      icon: <FaChartLine className="feature-icon" />,
      title: "Dashboard Stats",
      description: "View total tasks, completed tasks, pending tasks, and overdue items at a glance."
    },
    {
      icon: <FaBell className="feature-icon" />,
      title: "Overdue Alerts",
      description: "Visual indicators show when tasks are overdue and need attention."
    },
    {
      icon: <FaUserCheck className="feature-icon" />,
      title: "User Authentication",
      description: "Secure login and registration system to keep your tasks private."
    },
    {
      icon: <FaMoon className="feature-icon" />,
      title: "Dark/Light Mode",
      description: "Switch between dark and light themes for comfortable viewing."
    }
  ];

  return (
    <div className={`homepage ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <FaTasks className="logo-icon" />
            <span className="logo-text">TaskFlow</span>
          </div>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <button onClick={toggleDarkMode} className="theme-toggle-btn">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <Link to="/login" className="nav-login-btn">Login</Link>
            <Link to="/register" className="nav-signup-btn">
              Sign Up <FaArrowRight />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full width like login page */}
      <section className="hero-full">
        <div className="hero-overlay"></div>
        <div className="hero-content-centered">
          <h1 className="hero-main-title">
            <span className="gradient-text">TaskFlow</span>
          </h1>
          <p className="hero-main-subtitle">
            A simple and elegant task management application built with the MERN stack
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="hero-btn-primary">
              Get Started <FaArrowRight />
            </Link>
            <Link to="/login" className="hero-btn-secondary">
              Login
            </Link>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Features Section - Like a separate page card */}
      <section id="features" className="features-wrapper">
        <div className="features-container">
          <div className="features-header">
            <FaLayerGroup className="features-icon" />
            <h2>Powerful Features</h2>
            <p>Everything you need to manage your tasks effectively</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-modern">
                <div className="feature-card-inner">
                  <div className="feature-icon-circle">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Like a separate page card with different styling */}
      <section id="about" className="about-wrapper">
        <div className="about-container">
          <div className="about-header">
            <FaCog className="about-icon" />
            <h2>About TaskFlow</h2>
            <p>Learn more about how this application works</p>
          </div>

          <div className="about-content">
            <div className="about-card-main">
              <div className="about-card-header">
                <FaShieldAlt className="about-card-icon" />
                <h3>Secure & Reliable</h3>
              </div>
              <p>
                TaskFlow uses JWT authentication to keep your data safe. 
                Your tasks are private and accessible only to you.
              </p>
            </div>

            <div className="about-card-main">
              <div className="about-card-header">
                <FaLayerGroup className="about-card-icon" />
                <h3>Full MERN Stack</h3>
              </div>
              <p>
                Built with MongoDB, Express, React, and Node.js. 
                A modern, full-stack JavaScript application.
              </p>
            </div>

            <div className="about-card-main">
              <div className="about-card-header">
                <FaRocket className="about-card-icon" />
                <h3>Fast & Responsive</h3>
              </div>
              <p>
                Optimized for performance and works seamlessly on 
                desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>

          <div className="tech-stack-showcase">
            <h4>Technologies Used</h4>
            <div className="tech-pills">
              <span className="tech-pill">React 18</span>
              <span className="tech-pill">Node.js</span>
              <span className="tech-pill">Express</span>
              <span className="tech-pill">MongoDB</span>
              <span className="tech-pill">JWT</span>
              <span className="tech-pill">Context API</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Another separate section */}
      <section className="cta-wrapper">
        <div className="cta-container">
          <h2>Ready to get started?</h2>
          <p>Join TaskFlow today and organize your tasks efficiently</p>
          <Link to="/register" className="cta-button-large">
            Create Free Account <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <FaTasks className="footer-icon" />
            <span>TaskFlow</span>
          </div>
          <p>© 2026 TaskFlow - MERN Stack Task Manager Application</p>
          <div className="footer-links">
            <Link to="/login">Login</Link>
            <span className="footer-separator">•</span>
            <Link to="/register">Register</Link>
            <span className="footer-separator">•</span>
            <a href="#features">Features</a>
            <span className="footer-separator">•</span>
            <a href="#about">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;