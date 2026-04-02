require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const userExists = await User.findOne({ username: 'admin' });
    
    if (userExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new User({
      username: 'admin',
      password: hashedPassword
    });

    await admin.save();
    console.log('Admin user created successfully. Username: admin, Password: admin123');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
