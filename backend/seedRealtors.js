require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // ensure path is correct

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/estate-studio';

const demoRealtors = [
  {
    name: 'Rajesh Sharma',
    email: 'rajesh@example.com',
    password: 'password123',
    role: 'realtor',
    city: 'Mumbai',
    specialization: 'Luxury Apartments',
    experience: '10+ Years',
    bio: 'Expert in high-end properties in South Mumbai with over a decade of experience closing premium deals.',
    isVerified: true
  },
  {
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: 'password123',
    role: 'realtor',
    city: 'Pune',
    specialization: 'Commercial Spaces',
    experience: '5+ Years',
    bio: 'Helping businesses find the perfect office spaces and retail outlets across Pune.',
    isVerified: true
  },
  {
    name: 'Amit Kumar',
    email: 'amit@example.com',
    password: 'password123',
    role: 'realtor',
    city: 'Delhi',
    specialization: 'Villas & Independent Houses',
    experience: '8+ Years',
    bio: 'Your trusted partner for buying and selling independent houses in Delhi NCR.',
    isVerified: false
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    password: 'password123',
    role: 'realtor',
    city: 'Hyderabad',
    specialization: 'Gated Communities',
    experience: '6+ Years',
    bio: 'Specialist in premium gated communities and modern apartments in Hitec City.',
    isVerified: true
  },
  {
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    password: 'password123',
    role: 'realtor',
    city: 'Bangalore',
    specialization: 'Plots & Land',
    experience: '12+ Years',
    bio: 'Extensive knowledge of land acquisitions, plotting schemes, and investment properties.',
    isVerified: false
  },
  {
    name: 'Neha Gupta',
    email: 'neha@example.com',
    password: 'password123',
    role: 'realtor',
    city: 'Gurgaon',
    specialization: 'Penthouse & Luxury',
    experience: '7+ Years',
    bio: 'Dedicated to providing exceptional service for luxury homebuyers in DLF phases and Golf Course Road.',
    isVerified: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (let realtorData of demoRealtors) {
      const existing = await User.findOne({ email: realtorData.email });
      if (!existing) {
        const uid = 'user_' + Math.random().toString(36).substr(2, 9);
        const newRealtor = new User({ ...realtorData, uid });
        await newRealtor.save();
        console.log(`Added realtor: ${realtorData.name}`);
      } else {
        console.log(`Realtor ${realtorData.name} already exists.`);
      }
    }

    console.log('Seeding completed!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
