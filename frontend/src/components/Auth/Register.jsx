import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    setLoading(false);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p>
          Or{' '}
          <Link to="/login" className="auth-link">
            sign in to existing account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Field */}
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`auth-input ${errors.name ? 'error' : ''}`}
              />
            </div>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Email Field */}
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
                className={`auth-input ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password Field */}
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
                className={`auth-input ${errors.password ? 'error' : ''}`}
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
                tabIndex="-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
              />
              <button 
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle-btn"
                tabIndex="-1"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;