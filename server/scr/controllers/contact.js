const Contact = require('../models/Contact');
const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumbers, tags, zip, state, city } = req.body;
        console.log("DEBUG VALIDATION INPUT:", req.body);
        const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(409).json({
                status: 409,
                message: 'A contact with this email already exists'
            });
        }
        const newContact = await Contact.create({
            firstName,
            lastName,
            email,
            phoneNumbers,
            tags,
            zip,
            state,
            city
        });


        res.status(201).json({
            status: 201,
            message: "Contact created successfully",
            data: newContact
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while creating the contact"
        });
    }
}

const getAllContacts = async (req, res) => {
    try {
      
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

       
        const skip = (page - 1) * limit;

       
        const totalContacts = await Contact.countDocuments();

       
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            status: 200,
            message: "Contacts retrieved successfully",
            pagination: {
                totalItems: totalContacts,
                totalPages: Math.ceil(totalContacts / limit),
                currentPage: page,
                itemsPerPage: limit
            },
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while retrieving contacts",
            error: error.message
        });
    }
}

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: "Contact not found"
            });
        }
        res.status(200).json({
            status: 200,
            message: "Contact retrieved successfully",
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while retrieving the contact"
        });
    }
}

const updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({
                status: 404,
                message: "Contact not found"
            });
        }
        res.status(200).json({
            status: 200,
            message: "Contact updated successfully",
            data: updatedContact
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while updating the contact"
        });
    }
}

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({
                status: 404,
                message: "Contact not found"
            });
        }
        res.status(200).json({
            status: 200,
            message: "Contact deleted successfully",
            data: deletedContact
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while deleting the contact"
        });
    }
}


module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
};  