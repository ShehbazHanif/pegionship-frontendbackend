const Agent = require('../models/agent');

const createAgent = async (req, res) => {
    try {
        const { name, voice, languages, openingMessage, qualificationScenario, goal, background, exampleConversation, status } = req.body;

        const newAgent = await Agent.create({
            name,
            voice,
            languages,
            openingMessage,
            qualificationScenario,
            goal,
            background,
            exampleConversation: exampleConversation || null,
            status: status || 'Draft'
        })

        res.status(201).json({
            status: 201,
            message: "Agent created successfully",
            data: newAgent
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while creating the agent",
            error: error.message
        });
    }
}

const getAllAgents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalAgents = await Agent.countDocuments();
        const agents = await Agent.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'name email');

        res.status(200).json({
            status: 200,
            message: "Agents retrieved successfully",
            pagination: {
                totalItems: totalAgents,
                totalPages: Math.ceil(totalAgents / limit),
                currentPage: page,
                itemsPerPage: limit
            },
            data: agents
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while retrieving agents",
            error: error.message
        });
    }
}

const getAgentById = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!agent) {
            return res.status(404).json({
                status: 404,
                message: "Agent not found"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Agent retrieved successfully",
            data: agent
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while retrieving the agent",
            error: error.message
        });
    }
}

const updateAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, voice,  languages, openingMessage, qualificationScenario, goal, background, exampleConversation, status } = req.body;

        const agent = await Agent.findById(id);
        if (!agent) {
            return res.status(404).json({
                status: 404,
                message: "Agent not found"
            });
        }


        if (name) agent.name = name;

        if (voice) agent.voice = voice;
       
        if (languages) agent.languages = languages;
        if (openingMessage) agent.openingMessage = openingMessage;
        if (qualificationScenario) agent.qualificationScenario = qualificationScenario;
        if (goal) agent.goal = goal;
        if (background) agent.background = background;
        if (exampleConversation !== undefined) agent.exampleConversation = exampleConversation;
        if (status) agent.status = status;

        const updatedAgent = await agent.save();

        res.status(200).json({
            status: 200,
            message: "Agent updated successfully",
            data: updatedAgent
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while updating the agent",
            error: error.message
        });
    }
}

const deleteAgent = async (req, res) => {
    try {
        const id = req.params.id;

        const agent = await Agent.findByIdAndDelete(id);
        if (!agent) {
            return res.status(404).json({
                status: 404,
                message: "Agent not found"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Agent deleted successfully",
            data: agent
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while deleting the agent",
            error: error.message
        });
    }
}

module.exports = {
    createAgent,
    getAllAgents,
    getAgentById,
    updateAgent,
    deleteAgent
};
