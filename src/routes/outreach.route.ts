const express = require('express');
import {generateOutreachMessage} from '../controllers/outreach.controller'
const router = express.Router();

router.post('/personalized-message', generateOutreachMessage);


export default router;