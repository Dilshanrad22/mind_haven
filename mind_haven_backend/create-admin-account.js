require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function createAdminAccount() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@mindhaven.lk' });
    if (existingAdmin) {
      console.log('❌ Admin account already exists');
      console.log('Email: admin@mindhaven.lk');
      console.log('Password: admin123');
      await mongoose.connection.close();
      return;
    }

    // Create admin account
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@mindhaven.lk',
      password: 'admin123',
      userType: 'admin',
      phone: '+94 77 123 4567',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'other',
      isActive: true
    });

    console.log('✓ Admin account created successfully!');
    console.log('\n=== ADMIN CREDENTIALS ===');
    console.log('Email: admin@mindhaven.lk');
    console.log('Password: admin123');
    console.log('User Type: admin');
    console.log('========================\n');

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('Error creating admin account:', error);
    process.exit(1);
  }
}

createAdminAccount();
