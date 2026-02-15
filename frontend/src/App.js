import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';
import DashboardStats from './components/Dashboard/DashboardStats';
import './App.css';

// other imports

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  console.log('AppContent render', { user, darkMode });

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <main className="main-content">
                <DashboardStats />
                <TaskList />
              </main>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;