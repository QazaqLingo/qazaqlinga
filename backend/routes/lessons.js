const express = require('express');
const Lesson = require('../models/Lesson');
const Exercise = require('../models/Exercise');
const User = require('../models/User');
const UserLessonProgress = require('../models/UserLessonProgress');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/unit/:unitId', async (req, res) => {
  const lessons = await Lesson.find({ unitId: req.params.unitId }).sort({ orderNum: 1 }).lean();
  res.json(lessons);
});

router.get('/:lessonId', async (req, res) => {
  const lesson = await Lesson.findById(req.params.lessonId).lean();
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

  const exercises = await Exercise.find({ lessonId: lesson._id }).sort({ orderNum: 1 }).lean();
  res.json({ ...lesson, exercises });
});

router.post('/:lessonId/answer', authMiddleware, async (req, res) => {
  const { exerciseId, answer } = req.body;
  const exercise = await Exercise.findOne({ _id: exerciseId, lessonId: req.params.lessonId });
  if (!exercise) return res.status(404).json({ message: 'Exercise not found' });

  const correct = String(answer || '').trim().toLowerCase() === String(exercise.correctAnswer || '').trim().toLowerCase();
  res.json({ correct, correctAnswer: exercise.correctAnswer, explanation: exercise.explanation });
});

router.post('/:lessonId/complete', authMiddleware, async (req, res) => {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

  const score = Number(req.body.score || 0);
  const mistakes = Number(req.body.mistakes || 0);
  const multiplier = score >= 90 ? 1 : score >= 70 ? 0.75 : 0.6;
  const xpEarned = Math.round((lesson.xpReward || 10) * multiplier);

  await UserLessonProgress.findOneAndUpdate(
    { userId: req.user.id, lessonId: lesson._id },
    { completed: true, score, mistakes, xpEarned, timeSpent: req.body.timeSpent || 0, completedAt: new Date() },
    { upsert: true, new: true }
  );

  const user = await User.findByIdAndUpdate(req.user.id, { $inc: { xp: xpEarned }, $set: { lastActivity: new Date() } }, { new: true });
  res.json({ message: 'Lesson completed', xp_earned: xpEarned, total_xp: user.xp });
});

module.exports = router;
