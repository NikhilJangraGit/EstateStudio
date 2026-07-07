const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'realtor'], default: 'user' },
  
  // Extra Realtor Fields
  city: { type: String },
  specialization: { type: String },
  experience: { type: String },
  bio: { type: String },
  photoData: { type: String }, // Base64 image
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
