const Campaign = require('../models/campaign');

const createCampaign = async (req, res) => {
    try {
        const { name, agent, schedule, liveTransfer, selectedCallers, selectedContacts, status } = req.body;

        const totalContacts = selectedContacts ? selectedContacts.length : 0;

        const campaign = await Campaign.create({
            name,
            agent,
            schedule,
            liveTransfer,
            selectedCallers,
            selectedContacts,
            totalContacts,
            status
        });
        res.status(201).json({
            status: 201,
            message: 'Campaign created successfully',
            data: campaign
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred while creating the campaign',
            error: error.message
        });
    }
};

const getAllCampaigns = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalItems = await Campaign.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        const campaigns = await Campaign.find()
            .populate('agent', 'name')
            .populate('selectedCallers', 'name')
            .populate('selectedContacts', 'firstName lastName email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 200,
            message: 'Campaigns retrieved successfully',
            data: campaigns,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                limit: limit
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred while retrieving campaigns',
            error: error.message
        });
    }
};

const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('agent', 'name')
            .populate('selectedCallers', 'name')
            .populate('selectedContacts', 'firstName lastName email');
        if (!campaign) {
            return res.status(404).json({
                status: 404,
                message: 'Campaign not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Campaign retrieved successfully',
            data: campaign
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred while retrieving the campaign',
            error: error.message
        });
    }
};

const updateCampaign = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;

        if (update.selectedContacts) {
            update.totalContacts = update.selectedContacts.length;
        }

        const campaign = await Campaign.findByIdAndUpdate(id, update, { new: true });
        if (!campaign) {
            return res.status(404).json({
                status: 404,
                message: 'Campaign not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Campaign updated successfully',
            data: campaign
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred while updating the campaign',
            error: error.message
        });
    }
};

const deleteCampaign = async (req, res) => {
    try {
        const id = req.params.id;
        const campaign = await Campaign.findByIdAndDelete(id);
        if (!campaign) {
            return res.status(404).json({
                status: 404,
                message: 'Campaign not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Campaign deleted successfully',
            data: campaign
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred while deleting the campaign',
            error: error.message
        });
    }
};

module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
};
