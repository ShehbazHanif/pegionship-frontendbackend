const express = require('express');
const router = express.Router();
const { createCampaign, getAllCampaigns, getCampaignById, updateCampaign, deleteCampaign } = require('../controllers/campaign');
const { validateNewCampaign, validateUpdateCampaign } = require('../validation/validateCampaign');

router.post('/create', validateNewCampaign, createCampaign);
router.get('/getAllCampaigns', getAllCampaigns);
router.get('/getCampaign/:id', getCampaignById);
router.patch('/update/:id', validateUpdateCampaign, updateCampaign);
router.delete('/delete/:id', deleteCampaign);

module.exports = router;
