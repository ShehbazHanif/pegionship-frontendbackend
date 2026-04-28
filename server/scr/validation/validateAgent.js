const validateNewAgent = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: 400,
            message: 'Request body is missing or empty'
        });
    }

    const { name, voice, languages, openingMessage, qualificationScenario, goal, background, exampleConversation, status } = req.body;

    const errors = [];


    if (!name?.trim()) {
        errors.push('Agent name is required');
    }
    if (name && name.length < 2) {
        errors.push('Agent name must be at least 2 characters');
    }
    if (name && name.length > 50) {
        errors.push('Agent name must not exceed 50 characters');
    }




    const validVoices = ['American Male', 'American Female', 'British Male', 'British Female', 'Australian Male', 'Australian Female'];
    if (!voice?.trim()) {
        errors.push('Voice selection is required');
    }
    if (voice && !validVoices.includes(voice)) {
        errors.push(`Invalid voice. Must be one of: ${validVoices.join(', ')}`);
    }



    if (!languages?.trim()) {
        errors.push('Languages are required');
    }
    if (languages && languages.length > 100) {
        errors.push('Languages must not exceed 100 characters');
    }

    if (!openingMessage?.trim()) {
        errors.push('Opening message is required');
    }
    if (openingMessage && openingMessage.length < 5) {
        errors.push('Opening message must be at least 5 characters');
    }
    if (openingMessage && openingMessage.length > 500) {
        errors.push('Opening message must not exceed 500 characters');
    }


    if (!qualificationScenario?.trim()) {
        errors.push('Qualification scenario is required');
    }
    if (qualificationScenario && qualificationScenario.length < 10) {
        errors.push('Qualification scenario must be at least 10 characters');
    }
    if (qualificationScenario && qualificationScenario.length > 2000) {
        errors.push('Qualification scenario must not exceed 2000 characters');
    }


    if (!goal?.trim()) {
        errors.push('Agent goal is required');
    }
    if (goal && goal.length < 10) {
        errors.push('Agent goal must be at least 10 characters');
    }
    if (goal && goal.length > 2000) {
        errors.push('Agent goal must not exceed 2000 characters');
    }


    if (!background?.trim()) {
        errors.push('Agent background is required');
    }
    if (background && background.length < 10) {
        errors.push('Agent background must be at least 10 characters');
    }
    if (background && background.length > 2000) {
        errors.push('Agent background must not exceed 2000 characters');
    }

    if (exampleConversation !== undefined && exampleConversation !== null) {
        if (typeof exampleConversation !== 'string') {
            errors.push('Example conversation must be a string');
        }
        if (exampleConversation && exampleConversation.length > 3000) {
            errors.push('Example conversation must not exceed 3000 characters');
        }
    }

    const validStatuses = ['Active', 'Inactive', 'Draft'];
    if (status && !validStatuses.includes(status)) {
        errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
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

const validateUpdateAgent = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: 400,
            message: 'Request body is missing or empty'
        });
    }

    const { name, voice, languages, openingMessage, qualificationScenario, goal, background, exampleConversation, status } = req.body;

    const errors = [];


    if (name !== undefined) {
        if (!name?.trim()) {
            errors.push('Agent name cannot be empty');
        }
        if (name && name.length < 2) {
            errors.push('Agent name must be at least 2 characters');
        }
        if (name && name.length > 50) {
            errors.push('Agent name must not exceed 50 characters');
        }
    }





    const validVoices = ['American Male', 'American Female', 'British Male', 'British Female', 'Australian Male', 'Australian Female'];
    if (voice !== undefined) {
        if (!voice?.trim()) {
            errors.push('Voice cannot be empty');
        }
        if (voice && !validVoices.includes(voice)) {
            errors.push(`Invalid voice. Must be one of: ${validVoices.join(', ')}`);
        }
    }




    if (languages !== undefined) {
        if (!languages?.trim()) {
            errors.push('Languages cannot be empty');
        }
        if (languages && languages.length > 100) {
            errors.push('Languages must not exceed 100 characters');
        }
    }


    if (openingMessage !== undefined) {
        if (!openingMessage?.trim()) {
            errors.push('Opening message cannot be empty');
        }
        if (openingMessage && openingMessage.length < 5) {
            errors.push('Opening message must be at least 5 characters');
        }
        if (openingMessage && openingMessage.length > 500) {
            errors.push('Opening message must not exceed 500 characters');
        }
    }


    if (qualificationScenario !== undefined) {
        if (!qualificationScenario?.trim()) {
            errors.push('Qualification scenario cannot be empty');
        }
        if (qualificationScenario && qualificationScenario.length < 10) {
            errors.push('Qualification scenario must be at least 10 characters');
        }
        if (qualificationScenario && qualificationScenario.length > 2000) {
            errors.push('Qualification scenario must not exceed 2000 characters');
        }
    }

    if (goal !== undefined) {
        if (!goal?.trim()) {
            errors.push('Agent goal cannot be empty');
        }
        if (goal && goal.length < 10) {
            errors.push('Agent goal must be at least 10 characters');
        }
        if (goal && goal.length > 2000) {
            errors.push('Agent goal must not exceed 2000 characters');
        }
    }


    if (background !== undefined) {
        if (!background?.trim()) {
            errors.push('Agent background cannot be empty');
        }
        if (background && background.length < 10) {
            errors.push('Agent background must be at least 10 characters');
        }
        if (background && background.length > 2000) {
            errors.push('Agent background must not exceed 2000 characters');
        }
    }


    if (exampleConversation !== undefined && exampleConversation !== null) {
        if (typeof exampleConversation !== 'string') {
            errors.push('Example conversation must be a string');
        }
        if (exampleConversation && exampleConversation.length > 3000) {
            errors.push('Example conversation must not exceed 3000 characters');
        }
    }


    const validStatuses = ['Active', 'Inactive', 'Draft'];
    if (status !== undefined) {
        if (!validStatuses.includes(status)) {
            errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
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
    validateNewAgent,
    validateUpdateAgent
};
