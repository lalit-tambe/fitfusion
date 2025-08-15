import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose;

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
}, { _id: false });

const emergencyContactSchema = new Schema({
  name: String,
  phone: String,
  relationship: String
}, { _id: false });

const profileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: String,
  avatar: String, // URL
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  address: addressSchema,
  emergencyContact: emergencyContactSchema
}, { _id: false });

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['super_admin', 'admin', 'trainer', 'member'], default: 'member' },
  profile: profileSchema,
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
