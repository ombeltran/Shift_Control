const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    customerName: { type: String },
    workplace: { type: String, required: true },
    turn: { type: Number, required: true },
    available: { type: String, required: true }
});

module.exports = mongoose.model('Customers', CustomerSchema);