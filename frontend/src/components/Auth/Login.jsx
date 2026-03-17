import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { 
  FaTasks, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
 
  FaRocket
} from 'react-icons/fa';

import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Project Branding */}
        <div className="project-brand">
          <div className="brand-icon-wrapper">
            <FaTasks className="brand-icon" />
            <FaRocket className="brand-icon-secondary" />
          </div>
          <h1 className="project-name">TaskFlow</h1>
          <p className="project-tagline">Streamline Your Productivity</p>
          
          {/* Feature Pills */}
          <div className="feature-pills">
            <span className="pill">
              <span className="pill-icon">✓</span> MERN Stack
            </span>
            <span className="pill">
              <span className="pill-icon">✓</span> JWT Auth
            </span>
            <span className="pill">
              <span className="pill-icon">✓</span> Dark Mode
            </span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="card-header">
          <h2>Welcome Back!</h2>
          <p>
            New here?{' '}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'right', marginTop: '5px' }}>
  <Link to="/forgot-password" className="auth-link" style={{ fontSize: '13px' }}>
    Forgot password?
  </Link>
</div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Signing in...' : 'Sign In to TaskFlow'}
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Login;