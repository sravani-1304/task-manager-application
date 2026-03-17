import React from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
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

  const statusIcons = {
    pending: <FaCircle className="status-icon pending" size={20} />,
    ongoing: <FaSpinner className="status-icon ongoing" size={20} />,
    completed: <FaCheckCircle className="status-icon completed" size={20} />
  };

  const handleStatusToggle = async () => {
    try {
      let newStatus;
      if (task.status === 'pending') newStatus = 'ongoing';
      else if (task.status === 'ongoing') newStatus = 'completed';
      else newStatus = 'pending'; // completed -> pending

      const updatedTask = {
        ...task,
        status: newStatus
      };
      await api.put(`/tasks/${task._id}`, updatedTask);
      toast.success(`Task marked as ${newStatus}`);
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
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
        <div className="task-header">
          <button onClick={handleStatusToggle} className="status-toggle">
            {statusIcons[task.status]}
          </button>
          <h3 className={`task-title ${task.status}`}>
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
          <span className={`status-badge ${task.status}`}>
            {task.status === 'pending' && '⏳ Pending'}
            {task.status === 'ongoing' && '🔄 Ongoing'}
            {task.status === 'completed' && '✅ Completed'}
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