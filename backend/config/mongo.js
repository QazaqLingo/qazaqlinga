const mongoose = require('mongoose');

async function connectMongo() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error('MONGODB_URI is required');
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
  return mongoose.connection;
}

module.exports = { connectMongo };
