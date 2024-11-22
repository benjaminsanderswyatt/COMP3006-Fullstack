const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');


// Create user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });


// Hash the users password before putting it into the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  });


// Check the passwords correct
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);