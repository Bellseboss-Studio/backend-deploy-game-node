const logger = require('../logger');
const EmailModel = require('../models/email');

class UserController {

  saveEmail(req, res) {
    const { email } = req.body;
    EmailModel.saveEmail(email).then((result) => {
      logger.info(result, 'savedEmail in UserController.saveEmail');
      res.json({ email: result.email });
    }
    ).catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message, message: error.message });
    });
  }
}

module.exports = new UserController();
