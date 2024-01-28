const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/shift_control';

const connect = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('DB connection error:', error.message);
    }
};

module.exports = connect;
