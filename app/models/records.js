const mongoose = require('mongoose');

// Schema
const modelRecords = mongoose.model('Records', {
    key: String,
    value: String,
    createdAt: Date,
    counts: Array
});

module.exports = modelRecords