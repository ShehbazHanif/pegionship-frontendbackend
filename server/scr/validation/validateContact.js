const validateNewContact = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: 400,
            message: 'Request body is missing or empty'
        });
    }

    const { firstName, lastName, email, phoneNumbers, tags, city, zip, state } = req.body;

    const errors = [];


    if (!firstName?.trim()) errors.push('First name is required');
    if (!lastName?.trim()) errors.push('Last name is required');
    if (!email?.trim()) errors.push('Email is required');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Invalid email format');
    }


    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneNumbers || !phoneRegex.test(phoneNumbers)) {
        errors.push('Invalid phone number format');
    }


    if (!Array.isArray(tags)) {
        errors.push('Tags must be an array');
    } else if (tags.length === 0) {
        errors.push('At least one tag is required');
    } else {

        tags.forEach((tag, index) => {
            if (typeof tag !== 'string' || !tag.trim()) {
                errors.push(`Tag at index ${index} must be a non-empty string`);
            }
        });
    }

    if (!city || typeof city !== 'string') {
        errors.push('City must be a string');
    }
    if (!state || typeof state !== 'string') {
        errors.push('State must be a string');
    }
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zip || !zipRegex.test(zip)) {
        errors.push('Invalid ZIP code format');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 400,
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
};

module.exports = { validateNewContact };