const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


module.exports = mongoose.model('Users', UsersSchema);