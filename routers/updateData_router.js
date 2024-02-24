const express = require('express');
const updateData = require('../controllers/updateData_controller');

const router = express.Router();

router.get('/', updateData.updateData);

module.exports = router;
