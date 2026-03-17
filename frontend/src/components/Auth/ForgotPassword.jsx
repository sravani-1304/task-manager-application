import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaTasks, FaRocket } from 'react-icons/fa';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/password-reset/forgot', { email });
      toast.success(response.data.message);
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
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
          <p className="project-tagline">Reset Your Password</p>
        </div>

        <div className="divider"></div>

        <div className="card-header">
          <h2>{submitted ? 'Check Your Email' : 'Forgot Password?'}</h2>
          <p>
            <Link to="/login" className="auth-link">
              <FaArrowLeft /> Back to Login
            </Link>
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <p style={{ color: '#6b7280', marginBottom: '20px', textAlign: 'center' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <div className="form-group">
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="success-animation">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
            </div>
            
            <h3 style={{ color: '#10b981', marginBottom: '15px' }}>Email Sent! 📧</h3>
            
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              We've sent a password reset link to:<br />
              <strong style={{ color: '#667eea' }}>{email}</strong>
            </p>
            
            <div className="warning-box">
              <p>⚠️ The link will expire in 1 hour</p>
              <p>Don't forget to check your spam folder</p>
            </div>

            <button 
              onClick={() => setSubmitted(false)} 
              className="auth-button"
              style={{ marginTop: '20px', background: '#6b7280' }}
            >
              Try another email
            </button>
          </div>
        )}

        {/* Add CSS for success animation */}
        <style jsx>{`
          .success-animation {
            display: flex;
            justify-content: center;
            margin: 20px 0;
          }
          .checkmark-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #10b981;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: scaleIn 0.5s ease;
          }
          .checkmark {
            width: 40px;
            height: 20px;
            border-left: 4px solid white;
            border-bottom: 4px solid white;
            transform: rotate(-45deg) translate(5px, -5px);
            animation: fadeIn 0.5s ease 0.3s both;
          }
          .warning-box {
            background: #fff3cd;
            border: 1px solid #ffc107;
            border-radius: 8px;
            padding: 15px;
            color: #856404;
            margin: 20px 0;
          }
          @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ForgotPassword;