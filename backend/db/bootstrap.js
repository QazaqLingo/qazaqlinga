const { connectMongo } = require('../config/mongo');

async function bootstrapDataLayer() {
  await connectMongo();
  return { provider: 'mongo' };
}

module.exports = { bootstrapDataLayer };
