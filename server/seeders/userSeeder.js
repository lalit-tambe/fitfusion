import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import User from '../models/User.js'

dotenv.config();

const users = [
  {
    email: 'superadmin@example.com',
    password: 'password123',
    role: 'super_admin',
    profile: {
      firstName: 'Super',
      lastName: 'Admin',
      phone: '9999999999',
      gender: 'male',
      address: {
        street: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      },
      emergencyContact: {
        name: 'John Doe',
        phone: '8888888888',
        relationship: 'Friend'
      }
    }
  },
  {
    email: 'trainer1@example.com',
    password: 'trainer123',
    role: 'trainer',
    profile: {
      firstName: 'Trainer',
      lastName: 'One',
      gender: 'female'
    }
  },
  {
    email: 'member1@example.com',
    password: 'member123',
    role: 'member',
    profile: {
      firstName: 'Member',
      lastName: 'One',
      gender: 'other'
    }
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clean up old data (optional)
    await User.deleteMany();

    // Hash passwords
    const hashedUsers = await Promise.all(users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10)
    })));

    // Insert into DB
    await User.insertMany(hashedUsers);

    console.log('✅ Users seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
