import React, { useState, useEffect } from 'react';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './DashboardStats.css';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/tasks?limit=1000');
      const tasks = res.data.tasks;
      
      const now = new Date();
      const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'pending').length,
        overdue: tasks.filter(t => 
          t.status === 'pending' && new Date(t.dueDate) < now
        ).length
      };
      
      setStats(stats);
    } catch (error) {
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: FaTasks,
      color: '#2563eb',
      bgColor: '#dbeafe'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: FaCheckCircle,
      color: '#16a34a',
      bgColor: '#dcfce7'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: FaClock,
      color: '#ca8a04',
      bgColor: '#fef9c3'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: FaExclamationTriangle,
      color: '#dc2626',
      bgColor: '#fee2e2'
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;