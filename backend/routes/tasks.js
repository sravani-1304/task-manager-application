const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user with filters and sorting
router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, sortBy, search, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = { userId: req.user.id };
    if (status && status !== 'All') {
      filter.status = status.toLowerCase();
    }
    if (priority && priority !== 'All') {
      filter.priority = priority;
    }
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    // Build sort object
    let sort = {};
    if (sortBy === 'dueDate') {
      sort.dueDate = 1;
    } else if (sortBy === 'createdAt') {
      sort.createdAt = -1;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalTasks: total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    const task = new Task({
      userId: req.user.id,
      title,
      description,
      dueDate,
      priority,
      status: status || 'pending'
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    // Find task and verify ownership
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, dueDate, priority, status, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;