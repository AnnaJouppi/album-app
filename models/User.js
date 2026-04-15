import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user' 
},
username: {
  type: String
},
  name: {
    type: String,
    maxlength: [40, 'Name cannot be longer than 40 characters'],
    required: [true, 'Please, provide your first and last name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your e-mail address']
  },
  passwordHash: {
    type: String,
    required: true
  }  
})

// This runs before the user is saved to Mongodb
userSchema.pre('save', async function(next) {
  // Generate a salt to make the hash stronger
  const salt = await bcrypt.genSalt(10);

  // Hash the password with salt
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
})

export default mongoose.model('User', userSchema);