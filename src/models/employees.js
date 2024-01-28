const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    workplace: { type: String, required: true },
    available: { type: String, required: true }
});

module.exports = mongoose.model('Employees', EmployeeSchema);