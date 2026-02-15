import React from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaCircle, FaExclamationCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onTaskUpdated }) => {
  const priorityColors = {
    High: { color: '#dc2626', bg: '#fee2e2' },
    Medium: { color: '#ca8a04', bg: '#fef9c3' },
    Low: { color: '#16a34a', bg: '#dcfce7' }
  };

  const handleStatusToggle = async () => {
    try {
      const updatedTask = {
        ...task,
        status: task.status === 'completed' ? 'pending' : 'completed'
      };
      await api.put(`/tasks/${task._id}`, updatedTask);
      toast.success(`Task marked as ${updatedTask.status}`);
      onTaskUpdated();
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${task._id}`);
        toast.success('Task deleted successfully');
        onTaskUpdated();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <button onClick={handleStatusToggle} className="status-toggle">
            {task.status === 'completed' ? (
              <FaCheckCircle className="status-icon completed" size={20} />
            ) : (
              <FaCircle className="status-icon pending" size={20} />
            )}
          </button>
          <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
            {task.title}
          </h3>
        </div>
        
        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}
        
        <div className="task-meta">
          <span 
            className="priority-badge"
            style={{ 
              backgroundColor: priorityColors[task.priority].bg,
              color: priorityColors[task.priority].color
            }}
          >
            {task.priority}
          </span>
          <span className="due-date">
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
          {isOverdue && (
            <span className="overdue-badge">
              <FaExclamationCircle className="overdue-icon" />
              Overdue
            </span>
          )}
        </div>
      </div>
      
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="edit-btn" title="Edit task">
          <FaEdit />
        </button>
        <button onClick={handleDelete} className="delete-btn" title="Delete task">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;