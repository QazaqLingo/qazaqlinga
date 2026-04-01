const express = require('express');
const Lesson = require('../models/Lesson');
const Exercise = require('../models/Exercise');

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

module.exports = router;
