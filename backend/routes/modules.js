const express = require('express');
const Level = require('../models/Level');
const Module = require('../models/Module');
const Unit = require('../models/Unit');

const router = express.Router();

router.get('/levels', async (req, res) => {
  const levels = await Level.find().sort({ orderNum: 1 }).lean();
  const modules = await Module.find().sort({ orderNum: 1 }).lean();
  res.json(levels.map(level => ({ ...level, modules: modules.filter(module => String(module.levelId) === String(level._id)) })));
});

router.get('/:moduleId', async (req, res) => {
  const module = await Module.findById(req.params.moduleId).lean();
  if (!module) return res.status(404).json({ message: 'Module not found' });

  const units = await Unit.find({ moduleId: module._id }).sort({ orderNum: 1 }).lean();
  res.json({ ...module, units });
});

module.exports = router;
