const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String
    },
    important: {
        type: Boolean,
        default: false
    }
});

module.exports = Event = mongoose.model('event', EventSchema);
