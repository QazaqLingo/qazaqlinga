const express = require('express');
const User = require('../models/User');
const UserLessonProgress = require('../models/UserLessonProgress');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash').lean();
  const completedLessons = await UserLessonProgress.countDocuments({ userId: req.user.id, completed: true });
  res.json({ user, completedLessons });
});

module.exports = router;
