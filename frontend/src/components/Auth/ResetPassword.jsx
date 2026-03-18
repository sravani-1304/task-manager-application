import React, { useState, useEffect } from 'react';  // Remove useCallback from import
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './Auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);

  // Move validateToken inside useEffect
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await api.get(`/password-reset/validate/${token}`);
        setValidToken(response.data.valid);
      } catch (error) {
        setValidToken(false);
      } finally {
        setCheckingToken(false);
      }
    };

    validateToken();
  }, [token]);  // Only token is needed as dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post(`/password-reset/reset/${token}`, { password });
      toast.success(response.data.message);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: 'center', padding: '50px' }}>
          <div className="spinner" style={{ margin: '20px auto' }}></div>
          <p>Validating your reset link...</p>
        </div>
      </div>
    );
  }

  if (!validToken) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <h2>Invalid or Expired Link</h2>
          <p>This password reset link is invalid or has expired.</p>
          <Link to="/forgot-password" className="auth-button" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card-header">
          <h2>Reset Password</h2>
          <p>
            <Link to="/login" className="auth-link">
              <FaArrowLeft /> Back to Login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="auth-input"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle-btn"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="password-requirements">
            <p className="requirements-title">Password must:</p>
            <ul className="requirements-list">
              <li className={password.length >= 6 ? 'met' : ''}>
                <span className="requirement-indicator"></span>
                Be at least 6 characters
              </li>
              <li className={password && password === confirmPassword ? 'met' : ''}>
                <span className="requirement-indicator"></span>
                Passwords match
              </li>
            </ul>
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;