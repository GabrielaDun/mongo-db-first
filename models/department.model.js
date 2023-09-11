const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true}
})

model.exports = mongoose.model('Department', departmentSchema)