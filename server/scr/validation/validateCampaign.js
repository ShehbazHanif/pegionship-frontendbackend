const validateNewCampaign = async (req, res, next) => {
    const { name, agent, selectedCallers, selectedContacts, schedule, liveTransfer } = req.body;
    const errors = [];


    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        errors.push('Campaign name is required and must be at least 3 characters.');
    }
    if (!agent) {
        errors.push('Agent is required.');
    }
    if (!Array.isArray(selectedCallers)) {
        errors.push('Selected callers must be an array.');
    }
    if (!Array.isArray(selectedContacts)) {
        errors.push('Selected contacts must be an array.');
    }


    if (schedule) {
        if (!schedule.duration || typeof schedule.duration !== 'string') {
            errors.push('Schedule duration is required.');
        }
        if (!schedule.timezone || typeof schedule.timezone !== 'string') {
            errors.push('Schedule timezone is required.');
        }
    }


    if (liveTransfer) {
        if (liveTransfer.enabled === true) {
            if (!liveTransfer.displayName || typeof liveTransfer.displayName !== 'string' || !liveTransfer.displayName.trim()) {
                errors.push('Display name is required when Live Transfer is enabled.');
            }
            if (!liveTransfer.transferNumber || typeof liveTransfer.transferNumber !== 'string' || !liveTransfer.transferNumber.trim()) {
                errors.push('Transfer number is required when Live Transfer is enabled.');
            }
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 400,
            message: 'Validation errors',
            errors
        });
    }
    next();
};

const validateUpdateCampaign = async (req, res, next) => {
    const { name, agent, selectedCallers, selectedContacts, schedule, liveTransfer } = req.body;
    const errors = [];

    if (name !== undefined && (typeof name !== 'string' || name.trim().length < 3)) {
        errors.push('Campaign name must be at least 3 characters.');
    }
    if (agent !== undefined && !agent) {
        errors.push('Agent is required.');
    }
    if (selectedCallers !== undefined && !Array.isArray(selectedCallers)) {
        errors.push('Selected callers must be an array.');
    }
    if (selectedContacts !== undefined && !Array.isArray(selectedContacts)) {
        errors.push('Selected contacts must be an array.');
    }

    if (schedule) {
        if (schedule.duration && typeof schedule.duration !== 'string') {
            errors.push('Schedule duration must be a string.');
        }
        if (schedule.timezone && typeof schedule.timezone !== 'string') {
            errors.push('Schedule timezone must be a string.');
        }
    }


    if (liveTransfer) {
        if (liveTransfer.enabled === true) {
            if (!liveTransfer.displayName || typeof liveTransfer.displayName !== 'string' || !liveTransfer.displayName.trim()) {
                errors.push('Display name is required when Live Transfer is enabled.');
            }
            if (!liveTransfer.transferNumber || typeof liveTransfer.transferNumber !== 'string' || !liveTransfer.transferNumber.trim()) {
                errors.push('Transfer number is required when Live Transfer is enabled.');
            }
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 400,
            message: 'Validation errors',
            errors
        });
    }
    next();
};

module.exports = {
    validateNewCampaign,
    validateUpdateCampaign
};
