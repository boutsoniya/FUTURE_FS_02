require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));

const PORT = process.env.PORT || 5000;

// Connect to In-Memory MongoDB
const startServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log('Temporary In-Memory MongoDB Connected');

    // Auto-seed admin user
    const userExists = await User.findOne({ username: 'admin' });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const admin = new User({ username: 'admin', password: hashedPassword });
      await admin.save();
      console.log('Default Admin Account Created (admin / admin123)');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

startServer();
