const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    liveTransfer: {
        enabled: {
            type: Boolean,
            default: false
        },
        displayName: {
            type: String,
            trim: true,
            default: null
        },
        transferNumber: {
            type: String,
            trim: true,
            default: null
        }
    },
    schedule: {
        duration: String,
        timezone: String,
        Monday: {
            enabled: Boolean,
            start: String,

        },
        Tuesday: {
            enabled: Boolean,
            start: String,

        },
        Wednesday: {
            enabled: Boolean,
            start: String,

        },
        Thursday: {
            enabled: Boolean,
            start: String,

        },
        Friday: {
            enabled: Boolean,
            start: String,

        },
        Saturday: {
            enabled: Boolean,
            start: String,

        },
        Sunday: {
            enabled: Boolean,
            start: String,

        }
    },
    selectedCallers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        default: []
    }],
    selectedContacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        default: []
    }],
    status: {
        type: String,
        enum: ['Draft', 'Active', 'Completed', 'Paused'],
        default: 'Draft'
    },
    totalContacts: {
        type: Number,
        default: 0
    },
    responsePercentage: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Campaign', campaignSchema);
