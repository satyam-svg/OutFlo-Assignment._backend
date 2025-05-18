import express from 'express';
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,

  deleteCampaign,
  updateCampaign
} from '../controllers/campaign.controller';

const router = express.Router();

router.route('/campaigns')
  .get(getAllCampaigns)
  .post(createCampaign);

router.route('/campaigns/:id')
  .get(getCampaignById)
  .put(updateCampaign)
  .delete(deleteCampaign);

export default router;