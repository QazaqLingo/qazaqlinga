require('dotenv').config();

const { connectMongo } = require('../config/mongo');
const Level = require('../models/Level');
const Module = require('../models/Module');
const Unit = require('../models/Unit');
const Lesson = require('../models/Lesson');
const Exercise = require('../models/Exercise');

async function seed() {
  await connectMongo();
  await Promise.all([Level.deleteMany({}), Module.deleteMany({}), Unit.deleteMany({}), Lesson.deleteMany({}), Exercise.deleteMany({})]);

  const level = await Level.create({ code: 'A1', name: 'Beginner', description: 'Basic Kazakh', orderNum: 1 });
  const module = await Module.create({ levelId: level._id, title: 'Almaty Journey', titleKz: 'Алматыға саяхат', orderNum: 1 });
  const unit = await Unit.create({ moduleId: module._id, title: 'University', titleKz: 'Университет', orderNum: 1, lessonCount: 1 });
  const lesson = await Lesson.create({ unitId: unit._id, title: 'Greetings', type: 'choice', xpReward: 10, content: 'Learn basic greetings', orderNum: 1 });
  await Exercise.create({ lessonId: lesson._id, type: 'choice', question: 'How do you say hello?', options: ['Сәлем', 'Рақмет'], correctAnswer: 'Сәлем', orderNum: 1 });

  console.log('Seed completed');
  process.exit(0);
}

seed().catch(error => { console.error(error); process.exit(1); });
