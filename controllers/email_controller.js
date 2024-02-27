const logger = require('../logger');
const EmailModel = require('../models/email');

class UserController {

  saveEmail(req, res) {
    const { email } = req.body;
    //validate if email have a valid format and is not empty
    if (!email || !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      res.status(400).json({ error: 'Invalid email', message: 'Invalid email' });
      return;
    }
    EmailModel.saveEmail(email).then((result) => {
      logger.info([result, 'savedEmail in UserController.saveEmail']);
      res.json({ email: result.email });
    }).catch((error) => {
      logger.error(error);
      res.status(500).json({ error: error.message, message: error.message });
    });
  }
}

module.exports = new UserController();
