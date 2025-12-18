import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});

UserSchema.methods.comparePassword = async function (passw) { 
    return await bcrypt.compare(passw, this.password); 
};
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};
UserSchema.pre('save', async function () {
  // Only hash password if new or modified
  if (!this.isModified('password')) return;

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

export default mongoose.model('User', UserSchema);
