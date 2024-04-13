const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    place: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Correct the reference here from UserSchema to userSchema
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
