import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../../utils/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import toast from 'react-hot-toast';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    sortBy: '',
    search: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const res = await api.get(`/tasks?${params.toString()}`);
      setTasks(res.data.tasks);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
        totalTasks: res.data.totalTasks
      });
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSaved = () => {
    fetchTasks();
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h1>My Tasks</h1>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
          className="add-task-btn"
        >
          <FaPlus />
          <span>Add Task</span>
        </button>
      </div>

      <TaskFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No tasks found</p>
          <p className="empty-subtitle">Create your first task to get started!</p>
        </div>
      ) : (
        <>
          <div className="tasks-grid">
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onTaskUpdated={fetchTasks}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="page-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onTaskSaved={handleTaskSaved}
        />
      )}
    </div>
  );
};

export default TaskList;