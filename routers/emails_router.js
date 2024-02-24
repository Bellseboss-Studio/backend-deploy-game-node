const express = require('express');
const UserController = require('../controllers/email_controller');

const router = express.Router();

router.post('/save', UserController.saveEmail);

module.exports = router;
