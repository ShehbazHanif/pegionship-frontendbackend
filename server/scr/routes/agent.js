const express = require('express');
const router = express.Router();
const { createAgent, getAgentById, getAllAgents, updateAgent, deleteAgent } = require('../controllers/agent');
const { validateNewAgent, validateUpdateAgent } = require('../validation/validateAgent');

router.post('/create', validateNewAgent, createAgent);
router.get('/getAllAgents', getAllAgents);
router.get('/getAgent/:id', getAgentById);
router.patch('/update/:id', validateUpdateAgent, updateAgent);
router.delete('/delete/:id', deleteAgent);

module.exports = router;
