const express = require('express');
const multer = require('multer');
const Level = require('../models/Level');
const Module = require('../models/Module');
const Unit = require('../models/Unit');
const Lesson = require('../models/Lesson');
const Exercise = require('../models/Exercise');
const User = require('../models/User');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.use(adminMiddleware);

function crud(model) {
  return {
    list: async (req, res) => res.json(await model.find().lean()),
    create: async (req, res) => res.status(201).json(await model.create(req.body)),
    update: async (req, res) => res.json(await model.findByIdAndUpdate(req.params.id, req.body, { new: true })),
    remove: async (req, res) => { await model.findByIdAndDelete(req.params.id); res.json({ deleted: true }); }
  };
}

for (const [path, model] of [['levels', Level], ['modules', Module], ['units', Unit], ['lessons', Lesson], ['exercises', Exercise]]) {
  const c = crud(model);
  router.get(`/${path}`, c.list);
  router.post(`/${path}`, c.create);
  router.put(`/${path}/:id`, c.update);
  router.delete(`/${path}/:id`, c.remove);
}

router.post('/upload', upload.single('file'), (req, res) => res.json({ url: `/uploads/${req.file.filename}` }));
router.get('/stats', async (req, res) => res.json({ users: await User.countDocuments(), lessons: await Lesson.countDocuments(), exercises: await Exercise.countDocuments() }));

module.exports = router;
