const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    tokenNumber: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['waiting', 'serving', 'completed'], 
        default: 'waiting' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Queue', QueueSchema);