const User = require('../models/User');
const authMiddleware = require('./auth');

async function adminMiddleware(req, res, next) {
  authMiddleware(req, res, async () => {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) return res.status(403).json({ message: 'Admin access required' });
    next();
  });
}

module.exports = adminMiddleware;
