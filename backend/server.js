const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { bootstrapDataLayer } = require('./db/bootstrap');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'QazaqLinga API v03 is running', db_provider: 'mongo' });
});

const PORT = process.env.PORT || 5000;

bootstrapDataLayer()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
