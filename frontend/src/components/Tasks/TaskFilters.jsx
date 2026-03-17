import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './TaskFilters.css';

const TaskFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <FaFilter className="filter-icon" />
        <h2>Filters</h2>
      </div>
      
      <div className="filters-grid">
        <div className="filter-group">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="filter-input search-input"
            />
          </div>
        </div>

        <select
          value={filters.status || 'All'}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="All">All Status</option>
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority || 'All'}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="filter-select"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={filters.sortBy || ''}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="filter-select"
        >
          <option value="">Sort By</option>
          <option value="dueDate">Due Date</option>
          <option value="createdAt">Created Date</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;