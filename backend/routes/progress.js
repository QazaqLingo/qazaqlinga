const express = require('express');
const User = require('../models/User');
const UserLessonProgress = require('../models/UserLessonProgress');
const UserSkill = require('../models/UserSkill');
const UserQuest = require('../models/UserQuest');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash').lean();
  const completedLessons = await UserLessonProgress.countDocuments({ userId: req.user.id, completed: true });
  const skills = await UserSkill.find({ userId: req.user.id }).lean();
  const quests = await UserQuest.find({ userId: req.user.id }).lean();
  res.json({ user, completedLessons, skills, quests });
});

router.get('/rating', async (req, res) => {
  const users = await User.find().select('name xp streak').sort({ xp: -1 }).limit(20).lean();
  res.json(users);
});

module.exports = router;
