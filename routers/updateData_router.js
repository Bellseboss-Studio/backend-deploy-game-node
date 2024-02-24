const express = require('express');
const updateData = require('../controllers/updateData_controller');

const router = express.Router();

router.post('/', updateData.updateData);

module.exports = router;
