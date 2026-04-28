const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    voice: {
        type: String,
        required: true,
        enum: ['American Male', 'American Female', 'British Male', 'British Female', 'Australian Male', 'Australian Female'],
        default: 'American Male'
    },

    languages: {
        type: String,
        required: true,
        default: 'English',
        trim: true
    },
    openingMessage: {
        type: String,
        required: true,
        trim: true
    },
    qualificationScenario: {
        type: String,
        required: true,
        trim: true
    },
    goal: {
        type: String,
        required: true,
        trim: true
    },
    background: {
        type: String,
        required: true,
        trim: true
    },
    exampleConversation: {
        type: String,
        trim: true,
        default: null
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Draft'],
        default: 'Draft'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Agent', agentSchema);
